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
            status: 'failed',
            message: `this error occured: ${error['name']}, explanation: ${error['errors'][0]['message']}`
        };
    }
}

module.exports = {
    create: create
}