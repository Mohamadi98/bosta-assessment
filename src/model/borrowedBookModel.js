const bookAgent = require('../model/bookModel');
const borrowerAgent = require('../model/borrowerModel');
const { DataTypes } = require('sequelize');
const connectDB = require('../dbConfig');

const borrowedBookClient = connectDB();
const borrowedBookAgent = borrowedBookClient.define('borrowedbook', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    book_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'book',
            key: 'id'
        },
    },
    borrower_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'borrower',
            key: 'id'
        },
    },
    borrowed_on: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
    },
    overdue: {
        type: DataTypes.BOOLEAN,
    },
}, {
    timestamps: false,
    tableName: 'borrowedbook',
});

borrowedBookAgent.belongsTo(bookAgent, {
    foreignKey: 'book_id'
});
borrowedBookAgent.belongsTo(borrowerAgent, {
    foreignKey: 'borrower_id'
});

module.exports = borrowedBookAgent;
