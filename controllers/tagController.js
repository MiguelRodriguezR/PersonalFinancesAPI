const Tag = require('../models/Tag');

exports.createTag = async (req, res, next) => {
  try {
    const tag = new Tag(req.body);
    await tag.save();
    res.status(201).json(tag);
  } catch (err) {
    next(err);
  }
};

exports.getTags = async (req, res, next) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    next(err);
  }
};
