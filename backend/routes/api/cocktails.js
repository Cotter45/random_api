const express = require("express");
const asyncHandler = require("express-async-handler");
const nodeCache = require('../../utils/cache');

const { Cocktail, CocktailPicture, Cocktail_Ingredient, Ingredient } = require("../../db/models");

const cache = new nodeCache(3600);

const router = express.Router();

// route to get all cocktails and their ingredients
router.get('/', asyncHandler( async(req, res, next) => {
  
  let cocktails;

  if (cache.has('cocktails')) {
    cocktails = cache.get('cocktails');

    return res.json(cocktails);
  }

  try {

    cocktails = await Cocktail.findAll({
      include: [
        { 
          model: Cocktail_Ingredient,
          include: [
            { model: Ingredient },
          ],
        },
        { model: CocktailPicture }
      ]
    });

    cocktails = JSON.parse(JSON.stringify(cocktails));

    cache.set('cocktails', cocktails)

    return res.json(cocktails);
  } catch(e) {
    next(e);
  }
}))

// route to get all stock ingredients
router.get("/ingredients", asyncHandler( async(req, res, next) => {

  let ingredients;

  if (cache.has('ingredients')) {
    ingredients = cache.get('ingredients');

    return res.json(ingredients);
  }

  try {
    
    ingredients = await Ingredient.findAll();

    ingredients = JSON.parse(JSON.stringify(ingredients));

    cache.set('ingredients', ingredients);

    return res.json(ingredients);

  } catch(e) {
    next(e);
  }
}));

// route to get ingredients and drinks that can be made with them
router.get("/by_ingredient", asyncHandler( async(req, res, next) => {

  let ingredientsAndDrinks;

  if (cache.has('ingredientsAndDrinks')) {
    ingredientsAndDrinks = cache.get('ingredientsAndDrinks');

    return res.json(ingredientsAndDrinks);
  }

  try {

    ingredientsAndDrinks = await Ingredient.findAll({
      include: [
        {
          model: Cocktail,
          through: { attributes: [] },
          include: [
            { model: Cocktail_Ingredient },
            { model: CocktailPicture }
          ],
        }
      ]
    });

    ingredientsAndDrinks = JSON.parse(JSON.stringify(ingredientsAndDrinks));

    cache.set('ingredientsAndDrinks', ingredientsAndDrinks);
  
    return res.json(ingredientsAndDrinks);

  } catch(e) {
    next(e);
  }
}));

module.exports = router;