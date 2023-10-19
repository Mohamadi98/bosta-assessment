const { DataTypes } = require('sequelize');
const connectDB = require('../dbConfig');

const borrowerClient = connectDB();
const borrowerAgent = borrowerClient.define('borrower', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    timestamps: true,
    createdAt: 'registered_at',
    updatedAt: 'updated_at',
    tableName: 'borrower',
});

module.exports = borrowerAgent;
