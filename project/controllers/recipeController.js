const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('author', 'username').sort({ createdAt: -1 });
    res.render('recipes/index', { recipes, user: req.user });
  } catch (error) {
    res.status(500).render('error', { error: error.message, user: req.user });
  }
};

exports.getMyRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ author: req.user.id }).populate('author', 'username').sort({ createdAt: -1 });
    res.render('recipes/myRecipes', { recipes, user: req.user });
  } catch (error) {
    res.status(500).render('error', { error: error.message, user: req.user });
  }
};

exports.getNewRecipeForm = (req, res) => {
  res.render('recipes/new', { user: req.user, error: null });
};

exports.createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions, category, cookingTime, difficulty } = req.body;

    const ingredientsArray = ingredients.split(',').map(item => item.trim()).filter(item => item);

    const recipe = await Recipe.create({
      title,
      description,
      ingredients: ingredientsArray,
      instructions,
      category,
      cookingTime,
      difficulty,
      author: req.user.id
    });

    res.redirect('/recipes');
  } catch (error) {
    res.render('recipes/new', { user: req.user, error: error.message });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'username');
    const comments = await Comment.find({ recipe: req.params.id }).populate('author', 'username').sort({ createdAt: -1 });

    if (!recipe) {
      return res.status(404).render('error', { error: 'Recipe not found', user: req.user });
    }

    res.render('recipes/detail', { recipe, comments, user: req.user });
  } catch (error) {
    res.status(500).render('error', { error: error.message, user: req.user });
  }
};

exports.getEditRecipeForm = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).render('error', { error: 'Recipe not found', user: req.user });
    }

    if (recipe.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).render('error', { error: 'Not authorized to edit this recipe', user: req.user });
    }

    res.render('recipes/edit', { recipe, user: req.user, error: null });
  } catch (error) {
    res.status(500).render('error', { error: error.message, user: req.user });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).render('error', { error: 'Recipe not found', user: req.user });
    }

    if (recipe.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).render('error', { error: 'Not authorized to update this recipe', user: req.user });
    }

    const { title, description, ingredients, instructions, category, cookingTime, difficulty } = req.body;
    const ingredientsArray = ingredients.split(',').map(item => item.trim()).filter(item => item);

    recipe.title = title;
    recipe.description = description;
    recipe.ingredients = ingredientsArray;
    recipe.instructions = instructions;
    recipe.category = category;
    recipe.cookingTime = cookingTime;
    recipe.difficulty = difficulty;

    await recipe.save();

    res.redirect(`/recipes/${recipe._id}`);
  } catch (error) {
    res.status(500).render('error', { error: error.message, user: req.user });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).render('error', { error: 'Recipe not found', user: req.user });
    }

    if (recipe.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).render('error', { error: 'Not authorized to delete this recipe', user: req.user });
    }

    await Comment.deleteMany({ recipe: req.params.id });
    await Recipe.findByIdAndDelete(req.params.id);

    res.redirect('/recipes');
  } catch (error) {
    res.status(500).render('error', { error: error.message, user: req.user });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { content, rating } = req.body;

    await Comment.create({
      content,
      rating,
      author: req.user.id,
      recipe: req.params.id
    });

    res.redirect(`/recipes/${req.params.id}`);
  } catch (error) {
    res.status(500).render('error', { error: error.message, user: req.user });
  }
};
