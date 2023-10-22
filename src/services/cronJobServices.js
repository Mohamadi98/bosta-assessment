const cronJob = require('node-cron');
const dateServices = require('../services/dateServices');
const borrowedBookAgent = require('../model/borrowedBookModel');
const { Op } = require('sequelize');

const updateOverdueBooks = cronJob.schedule('0 6 * * *', async () => {
    const borrowedBooks = await borrowedBookAgent.findAll({
        where: {
            [Op.and]: [
                {
                    status: 'borrowed'
                },
                {
                    overdue: {
                        [Op.not]: true
                    }
                }
            ]
        }
    });

    let idArr = [];
    for (const row of borrowedBooks) {
        const dateChecker = dateServices.checkDatePassed(row.dataValues['due_date']);
        if (dateChecker === true) {
            idArr.push(row.dataValues['id']);
        }
    }

    const borrowedBooksData = {
        overdue: true
    }

    const [updatedBorrowedBooks] = await borrowedBookAgent.update(borrowedBooksData, {
        where: {
            id: idArr
        }
    });

    if (updatedBorrowedBooks > 0) {
        console.log('rows updated successfuly!');
    }
    else {
        console.log('No rows updated');
    }
    
}, {
    timezone: 'Africa/Cairo'
});

module.exports = {
    updateOverdueBooks: updateOverdueBooks
}