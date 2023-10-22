const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const bookRouter = require('../src/controllers/bookController');
const borrowerRouter = require('../src/controllers/borrowerController');
const borrowedBookRouter = require('../src/controllers/borrowedBookController');
const cronJobServices = require('../src/services/cronJobServices');
const morgan = require('morgan')

dotenv.config();
app.use(express.json({ limit: '5mb' }));
app.use(
    morgan('combined', {
      skip: (req) => req.method === "OPTIONS",
    })
  );
app.use(bodyParser.json());
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('server started');
});
app.use(bookRouter);
app.use(borrowerRouter);
app.use(borrowedBookRouter);
cronJobServices.updateOverdueBooks.start();

app.listen(PORT, () => {
    console.log(`Server running on port = ${PORT}`);
});

module.exports = app