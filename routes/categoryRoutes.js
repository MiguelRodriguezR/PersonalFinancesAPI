const express = require('express');
const router = express.Router();
const { createCategory, getCategories } = require('../controllers/categoryController');
const { validateCategory } = require('../middlewares/validators');

router.post('/', validateCategory, createCategory);
router.get('/', getCategories);

module.exports = router;
