const bookQuantityServices = require('../services/bookquantityHandler');
const borrowBookServices = require('../services/borrowedBookServices');
const borrowerServices = require('../services/borrowerServices');
const dateServices = require('../services/dateServices');
const express = require('express');

const borrowedBookRouter = express.Router();

const borrowBook = async (req, res) => {
    const { book_id, borrower_id, borrowed_on, due_date } = req.body;
    if (!book_id || !borrower_id, !borrowed_on, !due_date) {
        return res.status(404).json({
            message: 'missing required body parameters (book_id, borrower_id, borrowed_on, due_date) are all required'
        });
    }

    if (!dateServices.dateFormatValidator(borrowed_on) || !dateServices.dateFormatValidator(due_date)) {
        return res.status(400).json({
            message: 'incorrect date format. please provide date in this format YYYY-MM-DD'
        });
    }

    const borrowerCheker = await borrowerServices.fetchByID(borrower_id);
    if (borrowerCheker.status === 'failed') {
        return res.status(404).json({
            message: borrowerCheker.message
        });
    }
    else if (borrowerCheker.status === 'error') {
        return res.status(500).json({
            message: borrowerCheker.message
        });
    }

    const quantityHandler = await bookQuantityServices.checkBookQuantity(book_id);
    let quantity;
    if (quantityHandler.status === 'success') {
        if (quantityHandler.data === 0) {
            return res.status(404).json({
                message: 'this book is not available'
            });
        }
        quantity = quantityHandler.data;
    }
    else if (quantityHandler.status === 'failed') {
        return res.status(404).json({
            message: quantityHandler.message
        });
    }
    else {
        return res.status(500).json({
            message: quantityHandler.message
        });
    }

    const borrowedBookData = {
        book_id: book_id,
        borrower_id: borrower_id,
        borrowed_on: borrowed_on,
        due_date: due_date,
        status: 'borrowed'
    }

    const borrowedBook = await borrowBookServices.create(borrowedBookData);
    if (borrowedBook.status === 'success') {
        const quantityUpdate = await bookQuantityServices.alterQuantityAmount(book_id, quantity - 1);
        if (quantityUpdate.status === 'success') {
            res.status(200).json({
                message: borrowedBook.message
            });
        }
        else {
            res.status(500).json({
                message: quantityUpdate.message
            });
        }
    }
    else {
        res.status(500).json({
            message: borrowedBook.message
        });
    }
}

const returnBook = async (req, res) => {
    const book_id = req.params.id;
    const { borrower_id } = req.body;
    if (!book_id || !borrower_id) {
        return res.status(404).json({
            message: 'missing required parameters (book_id, borrower_id) are all required'
        });
    }

    const borrowerCheker = await borrowerServices.fetchByID(borrower_id);
    if (borrowerCheker.status === 'failed') {
        return res.status(404).json({
            message: borrowerCheker.message
        });
    }
    else if (borrowerCheker.status === 'error') {
        return res.status(500).json({
            message: borrowerCheker.message
        });
    }

    const quantityHandler = await bookQuantityServices.checkBookQuantity(book_id);

    let quantity;
    if (quantityHandler.status === 'success') {
        quantity = quantityHandler.data;
    }
    else if (quantityHandler.status === 'failed') {
        return res.status(404).json({
            message: quantityHandler.message
        });
    }
    else {
        return res.status(500).json({
            message: quantityHandler.message
        });
    }

    const borrowBookData = {
        status: 'returned',
        overdue: false
    }
    const borrowedBook = await borrowBookServices.update(book_id, borrower_id, borrowBookData);

    if (borrowedBook.status === 'success') {
        const quantityUpdate = await bookQuantityServices.alterQuantityAmount(book_id, quantity + 1);
        if (quantityUpdate.status === 'success') {
            res.status(200).json({
                message: borrowedBook.message
            });
        }
        else {
            res.status(500).json({
                message: quantityUpdate.message
            });
        }
    }
    else if (borrowedBook.status === 'failed') {
        res.status(404).json({
            message: borrowedBook.message
        });
    }
    else {
        res.status(500).json({
            message: borrowedBook.message
        });
    }
}

const getBooksByBorrowerID = async (req, res) => {
    borrower_id = req.params.id;

    const borrowerCheker = await borrowerServices.fetchByID(borrower_id);
    if (borrowerCheker.status === 'failed') {
        return res.status(404).json({
            message: borrowerCheker.message
        });
    }
    else if (borrowerCheker.status === 'error') {
        return res.status(500).json({
            message: borrowerCheker.message
        });
    }

    const books = await borrowBookServices.fetchBooksByBorrowerID(borrower_id);
    if (books.status === 'success') {
        res.status(200).json({
            books: books.data
        });
    }
    else {
        res.status(500).json({
            message: books.message
        });
    }
}

const getAllOverdueBooks = async (req, res) => {
    console.log('we are here');
    const books = await borrowBookServices.fetchOverdue();
    if (books.status === 'success') {
        res.status(200).json({
            books: books.data
        });
    }
    else {
        res.status(500).json({
            message: books.message
        });
    }
}

borrowedBookRouter.post('/borrow', borrowBook);
borrowedBookRouter.put('/borrow/:id', returnBook);
borrowedBookRouter.get('/borrow/:id', getBooksByBorrowerID);
borrowedBookRouter.get('/borrow', getAllOverdueBooks);

module.exports = borrowedBookRouter;