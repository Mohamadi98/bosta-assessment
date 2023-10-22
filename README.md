# Library Management System
Library Management System for managing books and borrowers. This Node.js application provides the ability to manage books, borrowers, and the borrowing process.
Part of Bosta recruitment process (technical assesment) for backend engineer role.

## Features
- Manage books: Add, update, delete, list, and search for books by title, author, or ISBN.
- Manage borrowers: Register, update, delete, list all borrowers.
- Borrowing process: Borrow and return books, view currently borrowed books, and track overdue books dates.

## Running The Project Locally
### Database Setup
- Create a postgres database without a schema
- Make sure to save important details like (database host, username, name, password) for later use
### Install The Project On Your Local Machine
- Clone this Repo locally and navigate to the project's folder
- Run this command to install the project dependencies `npm install`
### .ENV File
- Create a .env file in the root directory of the project and add the following variables
- DATABASE_HOST = your_database_host
- DATABASE_NAME = your_database_name
- DATABASE_USERNAME = your_database_username
- DATABASE_PASSWORD = your_database_password
- DB_CONNECTION_STRING = your_database_string , (if you cannot access the connection string directly from your database, it's actually quite simple to create).
  format => postgresql://db_username:db_password@db_host/db_name
- PORT = your_server_port
### Initiate The Database Schema
- Use this command `npm run db:migrate:up` to create the database tables and relationships
### Running The Project
- Use this command `npm run start` to run the server
## API Endpoints
### Book: used to create, update, delete, show and search books
#### Create a new Book
- HTTP Method: POST
- Path: /book
- Description: Create a new book entry in the database.
- Required Body Parameters:
  - title (string): The title of the book.
  - author (string): The author of the book.
  - isbn (string): The ISBN (International Standard Book Number) of the book.
  - quantity (integer): The available quantity of the book.
  - shelfLocation (string): The location of the book on the shelf.
#### Update a book
- HTTP Method: PUT
- Path: /book/:id
- Description: Update the details of an existing book entry.
- Path Parameter:
id (integer): The unique identifier of the book to update.
- Required Body Parameters:
At least one of the following parameters must be present:
  - title (string): The updated title of the book.
  - author (string): The updated author of the book.
  - isbn (string): The updated ISBN of the book.
  - quantity (integer): The updated available quantity of the book.
  - shelfLocation (string): The updated location of the book on the shelf.
#### Delete a book
- HTTP Method: DELETE
- Path: /book/:id
- Description: Delete a book entry from the database.
- Path Parameter:
id (integer): The unique identifier of the book to delete.
#### Show all books
- HTTP Method: GET
- Path: /book
- Description: Retrieve a list of all books in the database.
#### Search books
- HTTP Method: GET
- Path: /book/search
- Description: Search for books by specific criteria.
- Query Parameters:
  - key (string): The search key, which must be one of the following - "title," "author," or "isbn."
  - value (string): The search value corresponding to the specified key.
### Borrower: used to create, update, delete and show all borrowers
#### Create a new borrower
- HTTP Method: POST
- Path: /borrower
- Description: Create a new borrower entry in the database.
- Required Body Parameters:
  - name (string): The name of the borrower.
  - email (string): The email address of the borrower.
#### Update a borrower
- HTTP Method: PUT
- Path: /borrower/:id
- Description: Update the details of an existing borrower entry.
- Path Parameter:
id (integer): The unique identifier of the borrower to update.
- Required Body Parameters:
At least one of the following parameters must be present:
  - name (string): The updated name of the borrower.
  - email (string): The updated email address of the borrower.
#### Delete a borrower
- HTTP Method: DELETE
- Path: /borrower/:id
- Description: Delete a borrower entry from the database.
Path Parameter:
  - id (integer): The unique identifier of the borrower to delete.
#### Show all borrowers
- HTTP Method: GET
- Path: /borrower
- Description: Retrieve a list of all borrowers in the database.
### Borrow Book: used to borrow, return, show all borrowed books by a user and show all overdue books
#### Borrow a book
- HTTP Method: POST
- Path: /borrow
- Description: Borrow a book from the library.
- Required Body Parameters:
  - book_id (integer): The unique identifier of the book to be borrowed.
  - borrower_id (integer): The unique identifier of the borrower who is borrowing the book.
  - borrowed_on (string, ISO 8601 date format): The date when the book was borrowed.
  - due_date (string, ISO 8601 date format): The due date for returning the book.
#### Return a book
- HTTP Method: PUT
- Path: /borrow/:book_id
- Description: Return a borrowed book to the library.
- Path Parameter:
  - book_id (integer): The unique identifier of the book being returned.
- Required Body Parameters:
  - borrower_id (integer): The unique identifier of the borrower returning the book.
#### Show borrowed books by a borrower
- HTTP Method: GET
- Path: /borrow/:borrower_id
- Description: Retrieve a list of books borrowed by a specific borrower.
- Path Parameter:
  - borrower_id (integer): The unique identifier of the borrower.
#### Show all overdue books
- HTTP Method: GET
- Path: /borrow
- Description: Retrieve a list of all overdue books.

## Acessing The API Directly
- The API is deployed as a web service and can be accessed directly from here `https://bosta-assesment.onrender.com`
