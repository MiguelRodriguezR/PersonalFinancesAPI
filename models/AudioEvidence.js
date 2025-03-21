const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AudioEvidenceSchema = new Schema({
  transactionId: { type: Schema.Types.ObjectId, ref: 'Transaction', required: true },
  audioPath: { type: String, required: true },
  transcription: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('AudioEvidence', AudioEvidenceSchema);
