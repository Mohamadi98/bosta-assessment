CREATE TABLE borrowedBook (
    id SERIAL PRIMARY KEY,
    book_id INT REFERENCES Book(id),
    borrower_id INT REFERENCES Borrower(id),
    borrowed_on DATE NOT NULL,
    due_date DATE NOT NULL,
    returned_on DATE,
    overdue BOOLEAN
);