const express = require("express");
const asyncHandler = require("express-async-handler");
const nodeCache = require('../../utils/cache');

const { Cocktail, CocktailPicture, Cocktail_Ingredient, Ingredient } = require("../../db/models");

const cache = new nodeCache(3600);

const router = express.Router();

// route to get specific cocktail and its ingredients
router.get('/cocktail/:id', asyncHandler( async(req, res, next) => {
  const { id } = req.params;
console.log(id, "ID HERE")
  let cocktail;

  if (cache.has(`cocktail_${+id}`)) {
    cocktail = cache.get(`cocktail_${+id}`);

    return res.json(cocktail);
  }

  try {

    cocktail = await Cocktail.findByPk(+id, {
      include: [
        { model: Cocktail_Ingredient, include: [ { model: Ingredient } ] },
        { model: CocktailPicture}
      ]
    });

    cocktail = JSON.parse(JSON.stringify(cocktail));

    cache.set(`cocktail_${+id}`, cocktail);

    return res.json(cocktail);
  } catch(e) {
    next(e);
  }
}))

// route to get a random picture
router.get('/random_picture', asyncHandler( async (req, res, next) => {

  const pictures = await CocktailPicture.findAll();

  const random_number = Math.floor(Math.random() * (pictures.length) + 1);
  let randomPicture = pictures[random_number];
  
  if (!randomPicture) {
    while(!randomPicture) {
      const random_number = Math.floor(Math.random() * (pictures.length) + 1);
      randomPicture = pictures[random_number];
    }
  }
  
  return res.json(randomPicture.location);
}));

// route to get random cocktail and its ingredients
router.get('/random_cocktail', asyncHandler( async(req, res, next) => {

  const random_number = Math.floor(Math.random() * 77 + 1);

  let cocktail;

  if (cache.has(`cocktail_${random_number}`)) {
    cocktail = cache.get(`cocktail_${random_number}`);

    return res.json(cocktail);
  }

  try {

    cocktail = await Cocktail.findByPk(random_number, {
      include: [
        { model: Cocktail_Ingredient, include: [ { model: Ingredient } ] },
        { model: CocktailPicture}
      ]
    });

    cocktail = JSON.parse(JSON.stringify(cocktail));

    cache.set(`cocktail_${random_number}`, cocktail);

    return res.json(cocktail);
  } catch(e) {
    next(e);
  }
}))

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
router.get("/by_ingredients", asyncHandler( async(req, res, next) => {

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