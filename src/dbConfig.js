const Sequelize = require('sequelize')
const dotenv = require('dotenv')

dotenv.config();

const connectDB = () => {
    try {
        const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
            dialect: 'postgres',
            timezone: 'Africa/Cairo',
            logging: false
          });
        console.log('database connected successfuly!');
        return sequelize
    } catch (error) {
        return `there was an error: ${error}`
    }
}

module.exports = connectDB;