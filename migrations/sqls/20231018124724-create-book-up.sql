CREATE TABLE book (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(13) UNIQUE NOT NULL,
    quantity INT NOT NULL,
    shelf_location VARCHAR(100) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE INDEX title_index ON book (title);
CREATE INDEX author_index ON book (author);
CREATE INDEX isbn_index ON book (isbn);