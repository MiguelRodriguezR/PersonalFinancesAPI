const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res, next) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    next(err);
  }
};

exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    next(err);
  }
};
