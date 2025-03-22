const express = require('express');
const router = express.Router();
const { createTransaction, getTransactions, syncTransactions, deleteTransaction } = require('../controllers/transactionController');
const { validateTransaction } = require('../middlewares/validators');

router.post('/', validateTransaction, createTransaction);
router.get('/', getTransactions);
router.post('/sync', syncTransactions);
router.delete('/:id', deleteTransaction);

module.exports = router;
