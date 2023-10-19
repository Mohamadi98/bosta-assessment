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
        title: title.toLowerCase(),
        author: author.toLowerCase(),
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

const updateBook = async (req, res) => {
    const id = req.params.id;
    const {title, author, isbn, quantity, shelfLocation} = req.body;
    const book = await bookServices.fetchByID(id);
    if (book.status === 'failed') {
        return res.status(404).json({
            message: book.message
        });
    }
    const bookData = {
        title: title,
        author: author,
        isbn: isbn,
        quantity: quantity,
        shelf_location: shelfLocation
    }
    Object.keys(bookData).forEach(key => {
        if (bookData[key] === undefined) {
          delete bookData[key];
        }
      });
    if (bookData['title']) {
        bookData['title'] = bookData['title'].toLowerCase();
    }
    if (bookData['author']) {
        bookData['author'] = bookData['author'].toLowerCase();
    }
    
    const dbResponse = await bookServices.update(id, bookData);
    if (dbResponse.status === 'success') {
        res.status(200).json({
            message: dbResponse.message
        });
    }
    else {
        res.status(500).json({
            message: dbResponse.message
        });
    }
}

const deleteBook = async (req, res) => {
    const {id} = req.params;
    const dbResponse = await bookServices.destroy(id);
    if (dbResponse.status === 'success') {
        res.status(200).json({
            message: dbResponse.message
        });
    }
    else if (dbResponse.status === 'failed') {
        res.status(404).json({
            message: dbResponse.message
        });
    }
    else {
        res.status(500).json({
            message: dbResponse.message
        });
    }
}

const getBooks = async (req, res) => {
    const dbResponse = await bookServices.fetchAll();
    if (dbResponse.status === 'success') {
        res.status(200).json({
            data: dbResponse.data
        });
    }
    else {
        res.status(500).json({
            message: dbResponse.message
        });
    }
}

const searchBooks = async (req, res) => {
    const {key, value} = req.query;
    let searchObject = {};
    if (key === 'title') {
        searchObject['title'] = value;
    }
    else if (key === 'author') {
        searchObject['author'] = value;
    }
    else if (key === 'isbn') {
        searchObject['isbn'] = value;
    }
    else {
        return res.status(400).json({
            message: 'invalid key name in the query parameters'
        });
    }

    const dbResponse = await bookServices.search(searchObject);
    if (dbResponse.status === 'success') {
        res.status(200).json({
            data: dbResponse.data
        });
    }
    else {
        res.status(500).json({
            message: dbResponse.message
        });
    }
}

bookRouter.post('/book', addBook);
bookRouter.put('/book/:id', updateBook);
bookRouter.delete('/book/:id', deleteBook);
bookRouter.get('/book', getBooks);
bookRouter.get('/book/search', searchBooks);

module.exports = bookRouter;