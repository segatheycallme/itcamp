use std::{collections::HashMap, sync::Arc};

use axum::{
    extract::{Path, Query, Request, State},
    http::{HeaderMap, Method, StatusCode},
    routing::{delete, get, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};
use tokio::{
    fs::File,
    io::{AsyncReadExt, AsyncWriteExt},
    net::TcpListener,
    sync::RwLock,
};
use tower_http::cors::{Any, CorsLayer};
#[tokio::main]
async fn main() {
    let files = (
        "./data/users.json",
        "./data/quotes.json",
        "./data/tags.json",
    );
    let state = Arc::new(Data::new(files).await);
    let cors_layer = CorsLayer::new()
        .allow_methods(Any)
        .allow_headers(Any)
        .allow_origin(Any);

    let route = Router::new()
        .route("/", get(hi))
        .route("/sessions", post(login))
        .route("/quotes", get(get_all_quotes))
        .route("/quotes", post(add_quote))
        .route("/quotes/:id", get(get_quote))
        .route("/quotes/:id/:vote", post(vote))
        .route("/quotes/:id/:vote", delete(vote))
        .route("/tags", get(get_tags))
        .layer(cors_layer)
        .with_state(state.clone());
    let listener = TcpListener::bind("0.0.0.0:8000").await.unwrap();

    axum::serve(listener, route)
        .with_graceful_shutdown(kms(state, files))
        .await
        .unwrap();
}

async fn kms(state: Arc<Data>, (users_path, quotes_path, tags_path): (&str, &str, &str)) {
    // waiting for a signal on port 22341
    TcpListener::bind("0.0.0.0:22341")
        .await
        .unwrap()
        .accept()
        .await
        .unwrap()
        .0
        .shutdown()
        .await
        .unwrap();

    // writing to files
    let mut users_file = File::create(users_path).await.unwrap();
    let users_json = serde_json::to_string_pretty(&state.users).unwrap();
    users_file
        .write_all(&users_json.into_bytes())
        .await
        .unwrap();
    let mut quotes_file = File::create(quotes_path).await.unwrap();
    let quotes_json = serde_json::to_string_pretty(&state.quotes.write().await.clone()).unwrap();
    quotes_file
        .write_all(&quotes_json.into_bytes())
        .await
        .unwrap();
    let mut tags_file = File::create(tags_path).await.unwrap();
    let tags_json = serde_json::to_string_pretty(&state.tags.write().await.clone()).unwrap();
    tags_file.write_all(&tags_json.into_bytes()).await.unwrap();
}

async fn hi() -> String {
    "caooo".to_string()
}

async fn login(
    State(state): State<Arc<Data>>,
    Json(login_info): Json<User>,
) -> (StatusCode, String) {
    for (token, user) in state.users.iter() {
        if user == &login_info {
            return (
                StatusCode::OK,
                format!("{{{:?}:{:?}}}", "accessToken", &token),
            );
        }
    }
    (
        StatusCode::UNAUTHORIZED,
        "Incorrect credentials".to_string(),
    )
}

async fn get_all_quotes(
    State(state): State<Arc<Data>>,
    headers: HeaderMap,
    Query(filters): Query<QuoteFilters>,
) -> (StatusCode, Json<Quotes>) {
    match headers.get("Authorization") {
        Some(token) if state.users.contains_key(&token.to_str().unwrap()[7..]) => {
            let mut quotes = state.quotes.read().await.to_vec();

            quotes.sort_by(|a, b| match &filters.sort_by {
                Some(val) if val == "createdAt" => a.created_at.partial_cmp(&b.created_at).unwrap(),
                Some(val) if val == "author" => a.author.partial_cmp(&b.author).unwrap(),
                _ => a.upvotes_count.partial_cmp(&b.upvotes_count).unwrap(),
            });

            if filters.sort_direction == Some("desc".to_string()) {
                quotes.reverse();
            }

            if let Some(tags) = filters.tags {
                quotes.retain(|quote| {
                    for tag in &quote.tags {
                        if tags.contains(tag) {
                            return true;
                        }
                    }
                    false
                })
            }

            let len = quotes.len();

            if let Some(page_size) = filters.page_size {
                let page = filters.page.unwrap_or(1);

                if page == 0 {
                    return (StatusCode::BAD_REQUEST, Json::default());
                }

                let start = page * page_size - page_size;
                let end = page * page_size;
                quotes = quotes[(start.min(len))..(end.min(len))].to_vec();
            }

            (
                StatusCode::OK,
                Quotes {
                    quotes_count: len,
                    quotes: quotes
                        .into_iter()
                        .map(|quote| {
                            quote.into_quote_response(
                                state
                                    .users
                                    .get(&token.to_str().unwrap()[7..])
                                    .unwrap()
                                    .username
                                    .clone(),
                            )
                        })
                        .collect(),
                }
                .into(),
            )
        }
        _ => (StatusCode::UNAUTHORIZED, Json::default()),
    }
}

#[derive(Serialize, Default)]
#[serde(rename_all = "camelCase")]
struct Quotes {
    quotes_count: usize,
    quotes: Vec<QuoteResponse>,
}

#[derive(Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
struct QuoteFilters {
    sort_direction: Option<String>,
    sort_by: Option<String>,
    tags: Option<String>,
    page: Option<usize>,
    page_size: Option<usize>,
}

async fn get_quote(
    headers: HeaderMap,
    State(state): State<Arc<Data>>,
    Path(id): Path<String>,
) -> (StatusCode, Json<QuoteResponse>) {
    match headers.get("Authorization") {
        Some(token) if state.users.contains_key(&token.to_str().unwrap()[7..]) => {
            for quote in state.quotes.read().await.iter() {
                if quote.id == id {
                    return (
                        StatusCode::OK,
                        quote
                            .clone()
                            .into_quote_response(
                                state
                                    .users
                                    .get(&token.to_str().unwrap()[7..])
                                    .unwrap()
                                    .username
                                    .clone(),
                            )
                            .into(),
                    );
                }
            }
            (StatusCode::NOT_FOUND, Json::default())
        }
        _ => (StatusCode::UNAUTHORIZED, Json::default()),
    }
}

#[derive(Deserialize, Serialize, Clone, Default)]
#[serde(rename_all = "camelCase")]
struct QuoteResponse {
    id: String,
    content: String,
    author: String,
    tags: Vec<String>,
    upvotes_count: u32,
    downvotes_count: u32,
    created_at: String,
    given_vote: String,
}

async fn add_quote(
    State(state): State<Arc<Data>>,
    headers: HeaderMap,
    Json(new_quote): Json<NewQuote>,
) -> StatusCode {
    match headers.get("Authorization") {
        Some(token) if state.users.contains_key(&token.to_str().unwrap()[7..]) => {
            let mut quotes = state.quotes.write().await;
            let mut tags = state.tags.write().await;

            tags.append(&mut new_quote.tags.clone());
            tags.sort_unstable();
            tags.dedup();

            quotes.push(Quote {
                id: uuid::Uuid::new_v4().to_string(),
                content: new_quote.content,
                author: new_quote.author,
                tags: new_quote.tags,
                user: state
                    .users
                    .get(&token.to_str().unwrap()[7..])
                    .unwrap()
                    .username
                    .clone(),
                upvotes_count: 0,
                downvotes_count: 0,
                created_at: chrono::DateTime::<chrono::Utc>::from(std::time::SystemTime::now())
                    .to_rfc3339(),
                upvoted_by: vec![],
                downvoted_by: vec![],
            });
            StatusCode::OK
        }
        _ => StatusCode::FORBIDDEN,
    }
}

async fn vote(
    State(state): State<Arc<Data>>,
    headers: HeaderMap,
    Path((id, vote)): Path<(String, String)>,
    request: Request,
) -> StatusCode {
    match headers.get("Authorization") {
        Some(token) if state.users.contains_key(&token.to_str().unwrap()[7..]) => {
            let username = state
                .users
                .get(&token.to_str().unwrap()[7..])
                .unwrap()
                .username
                .clone();
            for quote in state.quotes.write().await.iter_mut() {
                if quote.id == id {
                    match request.method() {
                        &Method::POST => {
                            if &vote == "upvote" {
                                if quote.upvoted_by.contains(&username) {
                                    return StatusCode::FORBIDDEN;
                                }
                                quote.upvoted_by.push(username);
                                quote.upvotes_count += 1;
                                return StatusCode::OK;
                            }
                            if &vote == "downvote" {
                                if quote.downvoted_by.contains(&username) {
                                    return StatusCode::FORBIDDEN;
                                }
                                quote.downvoted_by.push(username);
                                quote.downvotes_count += 1;
                                return StatusCode::OK;
                            }
                        }
                        _ => {
                            if &vote == "upvote" {
                                if !quote.upvoted_by.contains(&username) {
                                    return StatusCode::FORBIDDEN;
                                }
                                quote.upvoted_by.retain(|victim| victim != &username);
                                quote.upvotes_count -= 1;
                                return StatusCode::OK;
                            }
                            if &vote == "downvote" {
                                if !quote.downvoted_by.contains(&username) {
                                    return StatusCode::FORBIDDEN;
                                }
                                quote.downvoted_by.retain(|victim| victim != &username);
                                quote.downvotes_count -= 1;
                                return StatusCode::OK;
                            }
                        }
                    }
                }
            }
            StatusCode::NOT_FOUND
        }
        _ => StatusCode::UNAUTHORIZED,
    }
}

#[derive(Deserialize)]
struct NewQuote {
    content: String,
    author: String,
    tags: Vec<String>,
}

async fn get_tags(
    State(state): State<Arc<Data>>,
    headers: HeaderMap,
) -> (StatusCode, Json<Vec<String>>) {
    match headers.get("Authorization") {
        Some(token) if state.users.contains_key(&token.to_str().unwrap()[7..]) => {
            (StatusCode::OK, state.tags.read().await.clone().into())
        }
        _ => (StatusCode::UNAUTHORIZED, Json::default()),
    }
}

#[derive(Debug)]
struct Data {
    users: HashMap<String, User>,
    quotes: RwLock<Vec<Quote>>,
    tags: RwLock<Vec<String>>,
}

impl Data {
    async fn new((users_path, quotes_path, tags_path): (&str, &str, &str)) -> Data {
        let mut users_file = File::open(users_path).await.unwrap();
        let mut users_json = String::new();
        users_file.read_to_string(&mut users_json).await.unwrap();

        let mut quotes_file = File::open(quotes_path).await.unwrap();
        let mut quotes_json = String::new();
        quotes_file.read_to_string(&mut quotes_json).await.unwrap();

        let mut tags_file = File::open(tags_path).await.unwrap();
        let mut tags_json = String::new();
        tags_file.read_to_string(&mut tags_json).await.unwrap();

        Data {
            users: serde_json::from_str(&users_json).unwrap(),
            quotes: RwLock::new(serde_json::from_str(&quotes_json).unwrap()),
            tags: RwLock::new(serde_json::from_str(&tags_json).unwrap()),
        }
    }
}

#[derive(Deserialize, Serialize, PartialEq, Debug)]
struct User {
    password: String,
    username: String,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
#[serde(rename_all = "camelCase")]
struct Quote {
    id: String,
    content: String,
    author: String,
    tags: Vec<String>,
    user: String,
    upvotes_count: u32,
    downvotes_count: u32,
    created_at: String,
    upvoted_by: Vec<String>,
    downvoted_by: Vec<String>,
}

impl Quote {
    fn into_quote_response(self, username: String) -> QuoteResponse {
        let mut given_vote = "none".to_string();
        if self.upvoted_by.contains(&username) {
            given_vote = "upvote".to_string()
        }
        if self.downvoted_by.contains(&username) {
            given_vote = "downvote".to_string()
        }
        QuoteResponse {
            id: self.id,
            content: self.content,
            author: self.author,
            tags: self.tags,
            upvotes_count: self.upvotes_count,
            downvotes_count: self.downvotes_count,
            created_at: self.created_at,
            given_vote,
        }
    }
}
