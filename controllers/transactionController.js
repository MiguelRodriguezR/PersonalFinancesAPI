const Transaction = require('../models/Transaction');

exports.updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Find the transaction
    let transaction = await Transaction.findOne({ id });
    
    if (!transaction) {
      return res.status(404).json({ 
        success: false, 
        message: 'Transaction not found' 
      });
    }
    
    // Update the transaction
    Object.assign(transaction, req.body);
    await transaction.save();
    
    res.status(200).json(transaction);
  } catch (err) {
    next(err);
  }
};

exports.deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Find and delete the transaction
    const transaction = await Transaction.findOneAndDelete({ id });
    
    if (!transaction) {
      return res.status(404).json({ 
        success: false, 
        message: 'Transaction not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Transaction deleted successfully' 
    });
  } catch (err) {
    next(err);
  }
};

exports.createTransaction = async (req, res, next) => {
  try {
    // Check if transaction with this id already exists
    const existingTransaction = await Transaction.findOne({ id: req.body.id });
    
    if (existingTransaction) {
      // Update existing transaction
      Object.assign(existingTransaction, req.body);
      await existingTransaction.save();
      return res.status(200).json(existingTransaction);
    } else {
      // Create new transaction
      const transaction = new Transaction(req.body);
      await transaction.save();
      return res.status(201).json(transaction);
    }
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

exports.syncTransactions = async (req, res, next) => {
  try {
    const { transactions } = req.body;
    
    if (!transactions || !Array.isArray(transactions)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid request format. Expected { transactions: [...] }' 
      });
    }
    
    const results = [];
    
    // Process each transaction
    for (const transactionData of transactions) {
      // Check if transaction already exists
      let transaction = await Transaction.findOne({ id: transactionData.id });
      
      if (transaction) {
        // Update existing transaction
        Object.assign(transaction, transactionData);
        await transaction.save();
        results.push({ id: transaction.id, status: 'updated' });
      } else {
        // Create new transaction
        transaction = new Transaction(transactionData);
        await transaction.save();
        results.push({ id: transaction.id, status: 'created' });
      }
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Transactions synchronized successfully',
      results 
    });
  } catch (err) {
    next(err);
  }
};
