const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a recipe title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  ingredients: {
    type: [String],
    required: [true, 'Please provide ingredients']
  },
  instructions: {
    type: String,
    required: [true, 'Please provide instructions']
  },
  category: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snacks', 'Beverages'],
    default: 'Dinner'
  },
  cookingTime: {
    type: Number,
    required: [true, 'Please provide cooking time in minutes']
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);
