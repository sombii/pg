CREATE DATABASE todo_db;

CREATE TABLE todo(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255)
)