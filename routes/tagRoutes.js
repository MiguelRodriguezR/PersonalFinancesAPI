const express = require('express');
const router = express.Router();
const { createTag, getTags } = require('../controllers/tagController');
const { validateTag } = require('../middlewares/validators');

router.post('/', validateTag, createTag);
router.get('/', getTags);

module.exports = router;
