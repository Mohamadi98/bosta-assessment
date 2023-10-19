const borrowerAgent = require('../model/borrowerModel');

const create = async (borrowerData) => {
    try {
        const borrower = await borrowerAgent.create(borrowerData);
        return {
            status: 'success',
            data: borrower
        }
    } catch (error) {
        return {
            status: 'error',
            message: `this error occured: ${error['name']}, description: ${error['errors'][0]['message']}`
        };
    }
}

const destroy = async (id) => {
    try {
        const borrower = await borrowerAgent.destroy({
            where: {
                id: id
            }
        });
        console.log(borrower);
        if (borrower > 0) {
            return {
                status: 'success',
                message: 'borrower deleted successfuly!'
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
            message: `this error occured: ${error['name']}, description: ${error['errors'][0]['message']}`
        };
    }
} 

module.exports = {
    create: create,
    destroy: destroy
}