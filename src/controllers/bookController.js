const bookServices = require('../services/bookServices');
const express = require('express');

const bookRouter = express.Router();

const addBook = async (req, res) => {
    const {title, author, isbn, quantity, shelfLocation} = req.body;
    if (!title || !author || !isbn || !quantity || !shelfLocation) {
        return res.status(400).json({
            message: 
            'missing body parameters (title, author, isbn, quantity, shelfLocation) are all required'
        });
    }
    if (title.length > 255) {
        return res.status(400).json({
            message: 'book title is too long'
        });
    }
    if (author.length > 255) {
        return res.status(400).json({
            message: 'author name is too long'
        });
    }
    if (isbn.length > 13) {
        return res.status(400).json({
            message: 'isbn must be 13 digits'
        });
    }
    if (quantity < 0) {
        return res.status(400).json({
            message: 'cannot have negative quantity value'
        });
    }
    if (shelfLocation.length > 100) {
        return res.status(400).json({
            message: 'shelf location is too long'
        });
    }

    const bookData = {
        title: title,
        author: author,
        isbn: isbn,
        quantity: quantity,
        shelf_location: shelfLocation
    }
    const dbResponse = await bookServices.create(bookData);
    if (dbResponse.status === 'success') {
        res.status(200).json({
            message: 'book added successfuly!'
        });
    }
    else {
        res.status(500).json({
            errorMessage: dbResponse.message
        });
    }
}

bookRouter.post('/book', addBook);

module.exports = bookRouter;