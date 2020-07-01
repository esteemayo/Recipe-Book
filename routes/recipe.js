const express = require('express');
const recipeController = require('../controller/recipeController');

const router = express.Router();

router
    .route('/')
    .get(recipeController.getAllRecipes)
    .post(recipeController.createRecipe);

router
    .route('/:id')
    .get(recipeController.getRecipe)
    .patch(recipeController.updateRecipe)
    .delete(recipeController.deleteRecipe);

module.exports = router;