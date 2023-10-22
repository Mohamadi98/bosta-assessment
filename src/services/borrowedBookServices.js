const borrowedBookAgent = require('../model/borrowedBookModel');
const bookAgent = require('../model/bookModel');
const {Op} = require('sequelize');

const create = async (borrowedBookData) => {
    try {
        const borrowedBook = await borrowedBookAgent.create(borrowedBookData);
        return {
            status: 'success',
            message: 'book borrowed successfuly!'
        }
    } catch (error) {
        return {
            status: 'error',
            message: `this error occurred: ${error}`
        };
    }
}

const update = async (book_id, borrower_id, borrowedBookData) => {
    try {
        const [updatedRowsCount] = await borrowedBookAgent.update(borrowedBookData, {
            where: {
                [Op.and]: [
                    {
                        book_id: book_id
                    },
                    {
                        borrower_id: borrower_id
                    }
                ]
            }
        });
        if (updatedRowsCount > 0) {
            return {
                status: 'success',
                message: 'borrowed book returned successfuly!'
            }
        }
        else {
            return {
                status: 'failed',
                message: 'book id or borrower id are not found'
            }
        }
    } catch (error) {
        return {
            status: 'error',
            message: `this error occurred: ${error}`
        };
    }
}

const fetchBooksByBorrowerID = async (borrower_id) => {
    try {
        const borrowedBooks = await borrowedBookAgent.findAll({
            where: {
                borrower_id: borrower_id
            },
            include: {
                model: bookAgent,
                required: true
            }
        });
        let books = [];
        for (const obj of borrowedBooks) {
            books.push(obj['book']);
        }
        return {
            status: 'success',
            data: books
        }

    } catch (error) {
        return {
            status: 'error',
            message: `this error occurred: ${error}`
        }
    }
}

const fetchOverdue = async () => {
    try {
        const borrowedBooks = await borrowedBookAgent.findAll({
            where: {
                overdue: true
            },
            include: {
                model: bookAgent,
                required: true
            }
        });

        let books = [];
        for (const obj of borrowedBooks) {
            books.push(obj['book']);
        }
        return {
            status: 'success',
            data: books
        }

    } catch (error) {
        return {
            status: 'error',
            message: `this error occurred: ${error}`
        }
    }
}

module.exports = {
    create: create,
    update: update,
    fetchBooksByBorrowerID: fetchBooksByBorrowerID,
    fetchOverdue: fetchOverdue
}