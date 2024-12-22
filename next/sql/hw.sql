CREATE TABLE users (
    user_id INT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);
CREATE TABLE profile (
    profile_id INT PRIMARY KEY,
    description VARCHAR(1024) NOT NULL,
    user_id INT NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);
CREATE TABLE post (
    post_id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body VARCHAR(255),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);
CREATE TABLE post_tag (
    post_id INT NOT NULL,
    tag_id INT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES post (post_id),
    FOREIGN KEY (tag_id) REFERENCES tag (tag_id)
);
CREATE TABLE tag (
    tag_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
