const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  audioPath: { type: String },
  llmReasoning: { type: String },
  status: { type: String, required: true },
  tagIds: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
});

module.exports = mongoose.model('Transaction', TransactionSchema);
