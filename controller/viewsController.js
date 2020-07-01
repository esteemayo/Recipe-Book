const Recipe = require('../models/Recipe');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
    const recipes = await Recipe.find();

    res.status(200).render('index', {
        title: 'Overview',
        recipes
    });
});

exports.addRecipe = catchAsync(async (req, res, next) => {
    const { name, ingredients, directions } = req.body;

    const recipe = await Recipe.create({ name, ingredients, directions });

    res.status(201).redirect('/');
});

exports.editRecipe = catchAsync(async (req, res, next) => {
    const { name, ingredients, directions } = req.body;

    const recipe = await Recipe.findByIdAndUpdate(req.params.id, { name, ingredients, directions }, {
        new: true,
        runValidators: true
    });

    if (!recipe) {
        return next(new AppError('No recipe found with that ID', 404));
    }

    res.status(204).redirect('/');
});

exports.deleteRecipe = catchAsync(async (req, res, next) => {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!recipe) {
        return next(new AppError('No recipe found with that ID', 404));
    }

    res.status(204).redirect('/');
});