const router = require('express').Router();
const Recipe = require('../db').import('../models/recipe');
const validateSession = require('../middleware/validate-session');

/////STILL IN DEV
//Create a new recipe
router.post('/create', validateSession, function (req, res) {
    const myNewRecipe = {
        recipeName: req.body.recipeName,
        recipeCategory: req.body.recipeCategory,
        recipeIngredients: req.body.recipeIngredients,
        recipeInstructions: req.body.recipeInstructions,
        recipePublic: req.body.recipePublic,
        chef: req.body.chef
    }

    Recipe.create(myNewRecipe)
    .then(recipe => res.status(200).json(recipe))
    .catch(err => res.status(500).json({error: err}))
});

//Get all currently logged recipes
router.get('/', (req, res) => {
    Recipe.findAll(req.body)
    .then(recipe => res.status(200).json(recipe))
    .catch(err => res.json({error: err}))
});

//Update an existing Recipe
router.put('/update/:id', validateSession, (req, res) => {
    Recipe.update(req.body, { where: { id: req.params.id }})
    .then(recipe => res.status(200).json(recipe))
    .catch(err => res.json({error: err}))
})

//works
router.delete('/:id', validateSession, (req, res) => {
    Recipe.destroy({ where: { 
        id: req.params.id, recipePublic: true
    } })
      .then(recipe => res.status(200).json(recipe))
      .catch(err => res.json({error: err}))
})

module.exports = router;
