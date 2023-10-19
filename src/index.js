const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const bookRouter = require('../src/controllers/bookController');
const borrowerRouter = require('../src/controllers/borrowerController');
// const connectDB = require('../src/dbConfig');

dotenv.config();
app.use(express.json({ limit: '5mb' }));
app.use(bodyParser.json());
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('server started');
});
app.use(bookRouter);
app.use(borrowerRouter);

// console.log(connectDB());

app.listen(PORT, () => {
    console.log(`Server running on port = ${PORT}`);
});

module.exports = app