CREATE TABLE borrowedbook (
    id SERIAL PRIMARY KEY,
    book_id INT REFERENCES Book(id),
    borrower_id INT REFERENCES Borrower(id),
    borrowed_on DATE NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(100),
    overdue BOOLEAN
);