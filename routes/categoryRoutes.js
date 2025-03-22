const express = require('express');
const router = express.Router();
const { createCategory, getCategories, syncCategories, deleteCategory } = require('../controllers/categoryController');
const { validateCategory } = require('../middlewares/validators');

router.post('/', validateCategory, createCategory);
router.get('/', getCategories);
router.post('/sync', syncCategories);
router.delete('/:id', deleteCategory);

module.exports = router;
