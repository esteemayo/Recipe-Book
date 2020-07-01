const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A recipe must have a name']
    },
    ingredients: {
        type: String,
        required: [true, 'A recipe must have ingredients']
    },
    directions: {
        type: String,
        required: [true, 'A recipe must have directions']
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;