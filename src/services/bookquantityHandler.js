const bookServices = require('../services/bookServices');

const checkBookQuantity = async (id) => {
    const book = await bookServices.fetchByID(id);
    if (book.status === 'success') {
        return {
            status: 'success',
            data: book.data.dataValues['quantity']
        };
    }
    else if (book.status === 'failed') {
        return {
            status: 'failed',
            message: book.message
        }
    }
    else {
        return {
            status: 'error',
            message: book.message
        }
    }

}

const alterQuantityAmount = async (id, quantity) => {
    const bookData = {
        quantity: quantity
    }
    const book = await bookServices.update(id, bookData);
    if (book.status === 'success') {
        return {
            status: 'success'
        }
    }
    else {
        return {
            status: 'error',
            message: book.message
        }
    }
}

module.exports = {
    checkBookQuantity: checkBookQuantity,
    alterQuantityAmount: alterQuantityAmount
}