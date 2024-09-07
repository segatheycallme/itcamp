use std::sync::Arc;

use axum::{
    extract::{Path, Query, Request, State},
    http::{HeaderMap, Method, StatusCode},
    routing::{delete, get, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};
use sqlx::{QueryBuilder, Row, SqlitePool};
use tokio::{io::AsyncWriteExt, net::TcpListener};
use tower_http::cors::{Any, CorsLayer};
#[tokio::main]
async fn main() {
    let state = Arc::new(SqlitePool::connect("sqlite://data.db").await.unwrap());
    let cors_layer = CorsLayer::new()
        .allow_methods(Any)
        .allow_headers(Any)
        .allow_origin(Any);

    let route = Router::new()
        .route("/", get(hi))
        .route("/sessions", post(login))
        .route("/quotes", get(get_quotes))
        .route("/quotes", post(add_quote))
        .route("/quotes/:id", get(get_quote))
        .route("/quotes/:id/:vote", post(vote))
        .route("/quotes/:id/:vote", delete(vote))
        .route("/tags", get(get_tags))
        .layer(cors_layer)
        .with_state(state.clone());
    let listener = TcpListener::bind("0.0.0.0:8000").await.unwrap();

    axum::serve(listener, route)
        .with_graceful_shutdown(kms(state))
        .await
        .unwrap();
}

async fn kms(state: Arc<SqlitePool>) {
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

    state.close().await;
}

async fn hi() -> String {
    "caooo".to_string()
}

async fn login(State(db): State<Arc<SqlitePool>>, Json(user): Json<User>) -> (StatusCode, String) {
    match sqlx::query("SELECT token FROM users WHERE username=$1 AND pass=$2")
        .bind(user.username)
        .bind(user.password)
        .fetch_one(&*db)
        .await
    {
        Ok(row) => (
            StatusCode::OK,
            format!("{{{:?}:{:?}}}", "accessToken", row.get::<&str, usize>(0)),
        ),
        Err(_) => (StatusCode::NOT_FOUND, "".to_string()),
    }
}

#[derive(Debug, Deserialize)]
struct User {
    username: String,
    password: String,
}

async fn auth(db: &SqlitePool, header_value: &str) -> Option<String> {
    if header_value.len() != 43 {
        return None;
    }
    sqlx::query("SELECT id FROM users WHERE token=$1")
        .bind(&header_value[7..])
        .fetch_one(db)
        .await
        .ok()
        .and_then(|row| row.get(0))
}

async fn get_quote(
    State(db): State<Arc<SqlitePool>>,
    headers: HeaderMap,
    Path(id): Path<String>,
) -> (StatusCode, Json<Quote>) {
    match auth(&db, headers.get("Authorization").unwrap().to_str().unwrap()).await {
        Some(user_id) => {
            let res = sqlx::query("SELECT * FROM quotes WHERE id=$1")
                .bind(&id)
                .fetch_one(&*db)
                .await;
            if res.is_err() {
                return (StatusCode::NOT_FOUND, Json::default());
            }

            let row = res.unwrap();
            let tags: Vec<String> = sqlx::query("SELECT tag FROM tags WHERE quote_id=$1")
                .bind(&id)
                .fetch_all(&*db)
                .await
                .unwrap()
                .into_iter()
                .map(|row| row.get(0))
                .collect();

            let mut vote: &str = "none";
            if sqlx::query("SELECT COUNT(1) FROM upvotes WHERE user_id=$1 AND quote_id=$2")
                .bind(&user_id)
                .bind(&id)
                .fetch_one(&*db)
                .await
                .unwrap()
                .get::<u8, usize>(0)
                == 1
            {
                vote = "upvote";
            } else if sqlx::query("SELECT COUNT(1) FROM upvotes WHERE user_id=$1 AND quote_id=$2")
                .bind(&user_id)
                .bind(&id)
                .fetch_one(&*db)
                .await
                .unwrap()
                .get::<u8, usize>(0)
                == 1
            {
                vote = "downvote";
            }

            let quote = Quote {
                id,
                content: row.get(2),
                author: row.get(3),
                tags,
                upvotes_count: row.get(4),
                downvotes_count: row.get(5),
                created_at: row.get(6),
                given_vote: vote.to_string(),
            };
            (StatusCode::OK, Json::from(quote))
        }
        None => (StatusCode::UNAUTHORIZED, Json::default()),
    }
}

async fn get_quotes(
    State(db): State<Arc<SqlitePool>>,
    headers: HeaderMap,
    Query(filters): Query<QuoteFilters>,
) -> (StatusCode, Json<QuoteResponse>) {
    match auth(&db, headers.get("Authorization").unwrap().to_str().unwrap()).await {
        Some(user_id) => {
            let mut query = QueryBuilder::new("SELECT * FROM quotes");

            if let Some(commas) = filters.tags {
                let mut tags = commas.split(',').map(|niz| niz.to_string()).peekable();
                query.push(" WHERE EXISTS (SELECT * FROM tags WHERE tags.quote_id=quotes.id AND tags.tag IN (");
                while let Some(tag) = tags.next() {
                    query.push_bind(tag.clone());
                    if tags.peek().is_some() {
                        query.push(",");
                    }
                }
                query.push("))");
            }

            let sort_by = match filters.sort_by.unwrap_or_default().as_str() {
                "upvotesCount" => "upvotes_count",
                "createdAt" => "created_at",
                _ => "author",
            };
            let sort_direction = match filters
                .sort_direction
                .unwrap_or_default()
                .to_uppercase()
                .as_str()
            {
                "DESC" => "DESC",
                _ => "ASC",
            };
            query.push(format!(" ORDER BY {} {}", sort_by, sort_direction));

            query.push(";");
            let mut rows = query.build().fetch_all(&*db).await.unwrap();

            let quotes_count = rows.len();
            let end = filters.page.unwrap_or(1) * filters.page_size.unwrap_or(10);
            let start = end - filters.page_size.unwrap_or(10);
            rows.truncate(end);
            if start >= rows.len() {
                return (StatusCode::BAD_REQUEST, Json::default());
            }

            let mut quotes: Vec<Quote> = vec![];
            for row in rows[start..].iter() {
                let id: String = row.get(0);
                let tags: Vec<String> = sqlx::query("SELECT tag FROM tags WHERE quote_id=$1")
                    .bind(id.clone())
                    .fetch_all(&*db)
                    .await
                    .unwrap()
                    .into_iter()
                    .map(|row| row.get(0))
                    .collect();

                let mut vote: &str = "none";
                if sqlx::query("SELECT COUNT(1) FROM upvotes WHERE user_id=$1 AND quote_id=$2")
                    .bind(user_id.clone())
                    .bind(id.clone())
                    .fetch_one(&*db)
                    .await
                    .unwrap()
                    .get::<u8, usize>(0)
                    == 1
                {
                    vote = "upvote";
                } else if sqlx::query(
                    "SELECT COUNT(1) FROM downvotes WHERE user_id=$1 AND quote_id=$2",
                )
                .bind(user_id.clone())
                .bind(id.clone())
                .fetch_one(&*db)
                .await
                .unwrap()
                .get::<u8, usize>(0)
                    == 1
                {
                    vote = "downvote";
                }

                quotes.push(Quote {
                    id,
                    content: row.get(2),
                    author: row.get(3),
                    tags,
                    upvotes_count: row.get(4),
                    downvotes_count: row.get(5),
                    created_at: row.get(6),
                    given_vote: vote.to_string(),
                });
            }
            (
                StatusCode::OK,
                Json::from(QuoteResponse {
                    quotes_count,
                    quotes,
                }),
            )
        }
        None => (StatusCode::UNAUTHORIZED, Json::default()),
    }
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

#[derive(Serialize, Debug, Default)]
#[serde(rename_all = "camelCase")]
struct QuoteResponse {
    quotes_count: usize,
    quotes: Vec<Quote>,
}

#[derive(Serialize, Debug, Default)]
#[serde(rename_all = "camelCase")]
struct Quote {
    id: String,
    content: String,
    author: String,
    tags: Vec<String>,
    upvotes_count: u64,
    downvotes_count: u64,
    created_at: String,
    given_vote: String,
}

async fn add_quote(
    State(db): State<Arc<SqlitePool>>,
    headers: HeaderMap,
    Json(quote): Json<NewQuote>,
) -> StatusCode {
    match auth(&db, headers.get("Authorization").unwrap().to_str().unwrap()).await {
        Some(user_id) => {
            let id = uuid::Uuid::new_v4().to_string();

            sqlx::query("INSERT INTO quotes VALUES ($1, $2, $3, $4, $5, $6, $7);")
                .bind(&id)
                .bind(user_id)
                .bind(quote.content)
                .bind(quote.author)
                .bind(0)
                .bind(0)
                .bind(
                    chrono::DateTime::<chrono::Utc>::from(std::time::SystemTime::now())
                        .to_rfc3339(),
                )
                .execute(&*db)
                .await
                .unwrap();

            if !quote.tags.is_empty() {
                let mut add_tags = QueryBuilder::new("INSERT INTO tags VALUES ");
                for tag in quote.tags {
                    add_tags.push("(");
                    add_tags.push_bind(&id);
                    add_tags.push(",");
                    add_tags.push_bind(tag);
                    add_tags.push(") ");
                }
                add_tags.push(";");
                add_tags.build().execute(&*db).await.unwrap();
            }

            StatusCode::OK
        }
        None => StatusCode::UNAUTHORIZED,
    }
}

#[derive(Deserialize, Debug)]
struct NewQuote {
    content: String,
    author: String,
    tags: Vec<String>,
}

async fn get_tags(
    State(db): State<Arc<SqlitePool>>,
    headers: HeaderMap,
) -> (StatusCode, Json<Vec<String>>) {
    match auth(&db, headers.get("Authorization").unwrap().to_str().unwrap()).await {
        Some(_) => {
            let tags: Vec<String> = sqlx::query("SELECT tag FROM tags")
                .fetch_all(&*db)
                .await
                .unwrap()
                .iter()
                .map(|row| row.get(0))
                .collect();
            (StatusCode::OK, Json::from(tags))
        }
        None => (StatusCode::UNAUTHORIZED, Json::default()),
    }
}

async fn vote(
    State(db): State<Arc<SqlitePool>>,
    headers: HeaderMap,
    Path((id, vote)): Path<(String, String)>,
    request: Request,
) -> StatusCode {
    match auth(&db, headers.get("Authorization").unwrap().to_str().unwrap()).await {
        Some(user_id) => {
            let svote = match vote.as_str() {
                "upvote" => "upvotes",
                _ => "downvotes",
            };
            match request.method() {
                &Method::POST => {
                    sqlx::query(format!("INSERT INTO {} VALUES ($1, $2);", svote).as_str())
                        .bind(user_id)
                        .bind(&id)
                        .execute(&*db)
                        .await
                        .unwrap();
                    sqlx::query(
                        format!(
                            "UPDATE quotes SET {}_count={}_count+1 WHERE id=$1;",
                            svote, svote
                        )
                        .as_str(),
                    )
                    .bind(id)
                    .execute(&*db)
                    .await
                    .unwrap();
                }
                _ => {
                    sqlx::query(
                        format!("DELETE FROM {} WHERE user_id=$1 AND quote_id=$2;", svote).as_str(),
                    )
                    .bind(user_id)
                    .bind(&id)
                    .execute(&*db)
                    .await
                    .unwrap();
                    sqlx::query(
                        format!(
                            "UPDATE quotes SET {}_count={}_count-1 WHERE id=$1;",
                            svote, svote
                        )
                        .as_str(),
                    )
                    .bind(id)
                    .execute(&*db)
                    .await
                    .unwrap();
                }
            }
            StatusCode::OK
        }
        None => StatusCode::UNAUTHORIZED,
    }
}
