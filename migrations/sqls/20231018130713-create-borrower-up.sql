CREATE TABLE borrower (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    registered_at TIMESTAMP,
    updated_at TIMESTAMP
);