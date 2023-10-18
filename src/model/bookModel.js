const { DataTypes } = require('sequelize');
const connectDB = require('../dbConfig');

const bookClient = connectDB();
const bookAgent = bookClient.define('book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isbn: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    shelf_location: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'book',
});

module.exports = bookAgent;
