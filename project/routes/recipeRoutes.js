const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const { authorize } = require('../middleware/authMiddleware');

router.get('/', recipeController.getAllRecipes);

router.get('/my-recipes', recipeController.getMyRecipes);

router.get('/new', recipeController.getNewRecipeForm);
router.post('/', recipeController.createRecipe);

router.get('/:id', recipeController.getRecipeById);

router.get('/:id/edit', recipeController.getEditRecipeForm);
router.post('/:id/edit', recipeController.updateRecipe);

router.post('/:id/delete', recipeController.deleteRecipe);

router.post('/:id/comments', recipeController.addComment);

module.exports = router;
