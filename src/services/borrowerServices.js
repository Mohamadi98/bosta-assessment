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
            message: `this error occured: ${error}`
        };
    }
}

const update = async (id, borrowerData) => {
    try {
        const borrower = await borrowerAgent.update(borrowerData, {
            where: {
                id: id
            }
        });
        return {
            status: 'success',
            message: 'borrower updated successfuly!' 
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
        const borrowers = await borrowerAgent.findAll();
        return {
            status: 'success',
            data: borrowers
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
        const borrower = await borrowerAgent.findOne({
            where: {
                id: id
            }
        });
        if (borrower) {
            return {
                status: 'success',
                data: borrower
            }
        }
        else {
            return {
                status: 'failed',
                message: `NO borrower was found matching this id: ${id}`
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
        const borrower = await borrowerAgent.destroy({
            where: {
                id: id
            }
        });
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
            message: `this error occured: ${error}`
        };
    }
} 

module.exports = {
    create: create,
    destroy: destroy,
    fetchAll: fetchAll,
    fetchByID: fetchByID,
    update: update
}