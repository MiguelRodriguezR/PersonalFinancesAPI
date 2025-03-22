const express = require('express');
const router = express.Router();
const { createTag, getTags, syncTags, deleteTag } = require('../controllers/tagController');
const { validateTag } = require('../middlewares/validators');

router.post('/', validateTag, createTag);
router.get('/', getTags);
router.post('/sync', syncTags);
router.delete('/:id', deleteTag);

module.exports = router;
