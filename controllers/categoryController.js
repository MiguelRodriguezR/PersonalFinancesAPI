const Category = require('../models/Category');

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Find and delete the category
    const category = await Category.findOneAndDelete({ id });
    
    if (!category) {
      return res.status(404).json({ 
        success: false, 
        message: 'Category not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Category deleted successfully' 
    });
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    // Check if category with this id already exists
    const existingCategory = await Category.findOne({ id: req.body.id });
    
    if (existingCategory) {
      // Update existing category
      Object.assign(existingCategory, req.body);
      await existingCategory.save();
      return res.status(200).json(existingCategory);
    } else {
      // Create new category
      const category = new Category(req.body);
      await category.save();
      return res.status(201).json(category);
    }
  } catch (err) {
    next(err);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

exports.syncCategories = async (req, res, next) => {
  try {
    const { categories } = req.body;
    
    if (!categories || !Array.isArray(categories)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid request format. Expected { categories: [...] }' 
      });
    }
    
    const results = [];
    
    // Process each category
    for (const categoryData of categories) {
      // Check if category already exists
      let category = await Category.findOne({ id: categoryData.id });
      
      if (category) {
        // Update existing category
        Object.assign(category, categoryData);
        await category.save();
        results.push({ id: category.id, status: 'updated' });
      } else {
        // Create new category
        category = new Category(categoryData);
        await category.save();
        results.push({ id: category.id, status: 'created' });
      }
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Categories synchronized successfully',
      results 
    });
  } catch (err) {
    next(err);
  }
};
