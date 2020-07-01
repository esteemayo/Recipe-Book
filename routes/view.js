const express = require('express');
const viewsController = require('../controller/viewsController');

const router = express.Router();

router.get('/', viewsController.getOverview);

router.put('/edit/:id', viewsController.editRecipe);

router.delete('/delete/:id', viewsController.deleteRecipe);

module.exports = router;