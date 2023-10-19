const borrowerServices = require('../services/borrowerServices');
const emailChecker = require('../services/emailChecker');
const express = require('express');

const borrowerRouter = express.Router();

const addBorrower = async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({
            message:
                'missing body parameters (name, email) are all required'
        });
    }
    if (name.length > 255) {
        return res.status(400).json({
            message: 'name is too long'
        });
    }
    if (!emailChecker.isValidEmail(email)) {
        return res.status(400).json({
            message: 'incorrect email format'
        });
    }

    const borrowerData = {
        name: name,
        email: email,
    }
    const dbResponse = await borrowerServices.create(borrowerData);
    if (dbResponse.status === 'success') {
        res.status(200).json({
            message: 'borrower added successfuly!'
        });
    }
    else {
        res.status(500).json({
            errorMessage: dbResponse.message
        });
    }
}

const updateBorrower = async (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;

    const borrower = await borrowerServices.fetchByID(id);

    if (borrower.status === 'failed') {
        return res.status(404).json({
            message: book.message
        });
    }

    const borrowerData = {
        name: name,
        email: email,
    }

    Object.keys(borrowerData).forEach(key => {
        if (borrowerData[key] === undefined) {
            delete borrowerData[key];
        }
    });

    if (Object.keys(borrowerData).length === 0) {
        return res.status(400).json({
            message: 'missing required parameters in the request body'
        });
    }

    if (borrowerData['email']) {
        if (!borrowerData.isValidEmail(borrowerData)) {
            return res.status(400).json({
                message: 'incorrect email format'
            });
        }
    }

    const dbResponse = await borrowerServices.update(id, borrowerData);

    if (dbResponse.status === 'success') {
        res.status(200).json({
            message: dbResponse.message
        });
    }
    else {
        res.status(500).json({
            message: dbResponse.message
        });
    }
}

const getBorrowers = async (req, res) => {
    const dbResponse = await borrowerServices.fetchAll();
    if (dbResponse.status === 'success') {
        res.status(200).json({
            data: dbResponse.data
        });
    }
    else {
        res.status(500).json({
            message: dbResponse.message
        });
    }
}

const deleteBorrower = async (req, res) => {
    const { id } = req.params;
    const dbResponse = await borrowerServices.destroy(id);
    if (dbResponse.status === 'success') {
        res.status(200).json({
            message: dbResponse.message
        });
    }
    else if (dbResponse.status === 'failed') {
        res.status(404).json({
            message: dbResponse.message
        });
    }
    else {
        res.status(500).json({
            message: dbResponse.message
        });
    }
}

borrowerRouter.post('/borrower', addBorrower);
borrowerRouter.put('/borrower/:id', updateBorrower);
borrowerRouter.get('/borrower', getBorrowers);
borrowerRouter.delete('/borrower/:id', deleteBorrower);

module.exports = borrowerRouter;