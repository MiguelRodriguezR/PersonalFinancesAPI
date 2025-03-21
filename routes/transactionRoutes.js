const express = require('express');
const router = express.Router();
const { createTransaction, getTransactions } = require('../controllers/transactionController');
const { validateTransaction } = require('../middlewares/validators');

router.post('/', validateTransaction, createTransaction);
router.get('/', getTransactions);

module.exports = router;
