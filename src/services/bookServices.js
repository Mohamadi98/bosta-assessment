const bookAgent = require('../model/bookModel');

const create = async (bookData) => {
    try {
        const book = await bookAgent.create(bookData);
        return {
            status: 'success',
            data: book
        }
    } catch (error) {
        return {
            status: 'error',
            message: `this error occured: ${error}`
        };
    }
}

const update = async (id, bookData) => {
    try {
        const book = await bookAgent.update(bookData, {
            where: {
                id: id
            }
        });
        if (book > 0) {
            return {
                status: 'success',
                message: 'book updated successfuly!'
            }
        }
    } catch (error) {
        return {
            status: 'error',
            message: `this error occured: ${error}`
        };
    }
}

const destroy = async (id) => {
    try {
        const book = await bookAgent.destroy({
            where: {
                id: id
            }
        });
        if (book > 0) {
            return {
                status: 'success',
                message: 'book deleted successfuly!'
            }
        }
        else {
            return {
                status: 'failed',
                message: 'the provided ID was not found'
            }
        }
    } catch (error) {
        return {
            status: 'error',
            message: `this error occured: ${error}`
        };
    }
} 

const fetchAll = async () => {
    try {
        const books = await bookAgent.findAll();
        return {
            status: 'success',
            data: books
        }
    } catch (error) {
        return {
            status: 'error',
            message: `this error occured: ${error}`
        };
    }
}

const fetchByID = async (id) => {
    try {
        const book = await bookAgent.findOne({
            where: {
                id: id
            }
        });
        if (book) {
            return {
                status: 'success',
                data: book
            }
        }
        else {
            return {
                status: 'failed',
                message: `NO book was found matching this id: ${id}`
            }
        }
    } catch (error) {
        return {
            status: 'error',
            message: `this error occured: ${error}`
        };
    }
}

const search = async (searchObject) => {
    try {
        const books = await bookAgent.findAll({
            where: searchObject
        });
        return {
            status: 'success',
            data: books
        }
    } catch (error) {
        return {
            status: 'error',
            message: `this error occured: ${error}`
        };
    }
}

module.exports = {
    create: create,
    destroy: destroy,
    fetchAll: fetchAll,
    search: search,
    fetchByID: fetchByID,
    update: update
}