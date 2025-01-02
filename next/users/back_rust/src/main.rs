use std::error::Error;
use std::sync::Arc;

use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::{delete, get, patch, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};
use sqlx::{postgres::PgPoolOptions, query, query_as, PgPool};
use tokio::net::TcpListener;
use tower_http::cors::CorsLayer;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let pool = Arc::new(
        PgPoolOptions::new()
            .max_connections(5)
            .connect("postgres://postgres:yourpassword@localhost:54320")
            .await?,
    );

    let cors_layer = CorsLayer::new()
        .allow_methods(tower_http::cors::Any)
        .allow_headers(tower_http::cors::Any)
        .allow_origin(tower_http::cors::Any);
    let app = Router::new()
        .route("/api/users", get(get_users))
        .route("/api/users", post(add_user))
        .route("/api/users/:id", get(get_user))
        .route("/api/users/:id", patch(mod_user))
        .route("/api/users/:id", delete(del_user))
        .layer(cors_layer)
        .with_state(pool);

    let listener = TcpListener::bind("0.0.0.0:3000").await?;
    axum::serve(listener, app).await?;

    Ok(())
}

async fn get_users(State(pool): State<Arc<PgPool>>) -> impl IntoResponse {
    let rows = query_as!(User, "SELECT email, password FROM users;")
        .fetch_all(&*pool)
        .await
        .unwrap();
    Json::from(rows)
}
async fn get_user(State(pool): State<Arc<PgPool>>, Path(id): Path<i32>) -> impl IntoResponse {
    match query_as!(User, "SELECT email, password FROM users WHERE id = $1;", id)
        .fetch_one(&*pool)
        .await
    {
        Ok(row) => (StatusCode::OK, row.into_response()),
        Err(sqlx::Error::RowNotFound) => (StatusCode::NOT_FOUND, Response::default()),
        Err(err) => {
            eprintln!("{err}");
            (StatusCode::INTERNAL_SERVER_ERROR, Response::default())
        }
    }
}
async fn del_user(State(pool): State<Arc<PgPool>>, Path(id): Path<i32>) -> impl IntoResponse {
    match query_as!(
        User,
        "DELETE FROM Users WHERE id = $1 RETURNING email, password;",
        id
    )
    .fetch_one(&*pool)
    .await
    {
        Ok(row) => (StatusCode::OK, row.into_response()),
        Err(sqlx::Error::RowNotFound) => (StatusCode::NOT_FOUND, Response::default()),
        Err(err) => {
            eprintln!("{err}");
            (StatusCode::INTERNAL_SERVER_ERROR, Response::default())
        }
    }
}
async fn add_user(State(pool): State<Arc<PgPool>>, Json(user): Json<User>) -> impl IntoResponse {
    let mut response = Response::default();
    match query_as!(
        User,
        "INSERT INTO Users (email, password) VALUES ($1, $2) RETURNING email, password;",
        user.email,
        user.password
    )
    .fetch_one(&*pool)
    .await
    {
        Ok(row) => {
            response = row.into_response();
            *response.status_mut() = StatusCode::CREATED;
        }
        Err(sqlx::Error::Database(err)) => {
            if err.is_unique_violation() {
                *response.status_mut() = StatusCode::CONFLICT;
            } else {
                eprintln!("{err}");
                *response.status_mut() = StatusCode::INTERNAL_SERVER_ERROR;
            }
        }
        Err(err) => {
            eprintln!("{err}");
            *response.status_mut() = StatusCode::INTERNAL_SERVER_ERROR;
        }
    };
    response
}
async fn mod_user(
    State(pool): State<Arc<PgPool>>,
    Path(id): Path<i32>,
    Json(user): Json<User>,
) -> impl IntoResponse {
    match query_as!(
        User,
        "UPDATE Users SET email = $1, password = $2 WHERE id = $3 RETURNING email, password;",
        user.email,
        user.password,
        id
    )
    .fetch_one(&*pool)
    .await
    {
        Ok(row) => (StatusCode::OK, row.into_response()),
        Err(sqlx::Error::RowNotFound) => (StatusCode::NOT_FOUND, Response::default()),
        Err(err) => {
            eprintln!("{err}");
            (StatusCode::INTERNAL_SERVER_ERROR, Response::default())
        }
    }
}

#[derive(Debug, Serialize, Deserialize, Default)]
struct User {
    email: String,
    password: String,
}

impl IntoResponse for User {
    fn into_response(self) -> Response {
        Json::from(self).into_response()
    }
}
