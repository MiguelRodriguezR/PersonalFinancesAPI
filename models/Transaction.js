const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  id: { type: String, required: false, unique: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true },
  categoryId: { type: String, required: true },
  audioPath: { type: String },
  llmReasoning: { type: String },
  status: { type: String, required: true },
  tagIds: [{ type: String }]
});

module.exports = mongoose.model('Transaction', TransactionSchema);
