import express, { Request, Response, NextFunction } from 'express';
const asyncHandler = require("express-async-handler");
const nodeCache = require('../../utils/cache');
import redisClient from '../../utils/redis';

const { Cocktail, CocktailPicture, Cocktail_Ingredient, Ingredient } = require("../../db/models");

const cache = new nodeCache(3600);

const router = express.Router();

// route to get specific cocktail and its ingredients
router.get('/cocktail/:id', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  let cocktail;

  if (await redisClient.exists(`cocktail_${+id}`)) {
    cocktail = await redisClient.get(`cocktail_${+id}`);
    return res.status(200).send(cocktail);
  }

  try {
    cocktail = await Cocktail.findByPk(+id, {
      include: [
        { model: Cocktail_Ingredient, include: [ { model: Ingredient } ] },
        { model: CocktailPicture}
      ]
    });
    await redisClient.set(`cocktail_${+id}`, JSON.stringify(cocktail));
    return res.status(200).json(cocktail);
  } catch(e) {
      next(e);
  }
}))

// route to get a random picture
router.get('/random_picture', asyncHandler( async (req: Request, res: Response, next: NextFunction) => {

  let pictures;
  if (await redisClient.exists('cocktail_pictures')) {
    pictures = await redisClient.get('cocktail_pictures');
  } else {
    pictures = await CocktailPicture.findAll();
  }

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
router.get('/random_cocktail', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {

  const random_number = Math.floor(Math.random() * 77 + 1);

  let cocktail;

  if (await redisClient.exists(`cocktail_${random_number}`)) {
    cocktail = await redisClient.get(`cocktail_${random_number}`);
    return res.status(200).json(cocktail);
  }

  try {
    cocktail = await Cocktail.findByPk(random_number, {
      include: [
        { model: Cocktail_Ingredient, include: [ { model: Ingredient } ] },
        { model: CocktailPicture}
      ]
    });
    await redisClient.set(`cocktail_${random_number}`, JSON.stringify(cocktail));
    return res.status(200).json(cocktail);
  } catch(e) {
    next(e);
  }
}))

// route to get all cocktails and their ingredients
router.get('/', asyncHandler( async(req: Request, res: Response, next: NextFunction) => {
  
  let cocktails;

  if (await redisClient.exists('cocktails')) {
    cocktails = await redisClient.get('cocktails');
    return res.status(200).send(cocktails);
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
    await redisClient.set('cocktails', JSON.stringify(cocktails))
    return res.status(200).json(cocktails);
  } catch(e) {
      next(e);
  }
}))

// route to get all stock ingredients
router.get("/ingredients", asyncHandler( async(req: Request, res: Response, next: NextFunction) => {

  let ingredients;

  if (await redisClient.exists('ingredients')) {
    ingredients = await redisClient.get('ingredients');
    return res.status(200).send(ingredients);
  }

  try {

    ingredients = await Ingredient.findAll();

    await redisClient.set('ingredients', JSON.stringify(ingredients));
    return res.status(200).json(ingredients);
  } catch(e) {
      next(e);
  }
}));

// route to get ingredients and drinks that can be made with them
router.get("/by_ingredients", asyncHandler( async(req: Request, res: Response, next: NextFunction) => {

  let ingredientsAndDrinks;

  if (await redisClient.exists('ingredientsAndDrinks')) {
    ingredientsAndDrinks = await redisClient.get('ingredientsAndDrinks');
    return res.status(200).send(ingredientsAndDrinks);
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
    await redisClient.set('ingredientsAndDrinks', JSON.stringify(ingredientsAndDrinks));
    return res.status(200).json(ingredientsAndDrinks);
  } catch(e) {
      next(e);
  }
}));

export = router;