const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  parentId: { type: String, default: null },
  level: { type: Number, required: true }
});

module.exports = mongoose.model('Category', CategorySchema);
