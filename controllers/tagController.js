const Tag = require('../models/Tag');

exports.deleteTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Find and delete the tag
    const tag = await Tag.findOneAndDelete({ id });
    
    if (!tag) {
      return res.status(404).json({ 
        success: false, 
        message: 'Tag not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Tag deleted successfully' 
    });
  } catch (err) {
    next(err);
  }
};

exports.createTag = async (req, res, next) => {
  try {
    // Check if tag with this id already exists
    const existingTag = await Tag.findOne({ id: req.body.id });
    
    if (existingTag) {
      // Update existing tag
      Object.assign(existingTag, req.body);
      await existingTag.save();
      return res.status(200).json(existingTag);
    } else {
      // Create new tag
      const tag = new Tag(req.body);
      await tag.save();
      return res.status(201).json(tag);
    }
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

exports.syncTags = async (req, res, next) => {
  try {
    const { tags } = req.body;
    
    if (!tags || !Array.isArray(tags)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid request format. Expected { tags: [...] }' 
      });
    }
    
    const results = [];
    
    // Process each tag
    for (const tagData of tags) {
      // Check if tag already exists
      let tag = await Tag.findOne({ id: tagData.id });
      
      if (tag) {
        // Update existing tag
        Object.assign(tag, tagData);
        await tag.save();
        results.push({ id: tag.id, status: 'updated' });
      } else {
        // Create new tag
        tag = new Tag(tagData);
        await tag.save();
        results.push({ id: tag.id, status: 'created' });
      }
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Tags synchronized successfully',
      results 
    });
  } catch (err) {
    next(err);
  }
};
