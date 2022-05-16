"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const asyncHandler = require("express-async-handler");
const nodeCache = require('../../utils/cache');
const redis_1 = __importDefault(require("../../utils/redis"));
const { Cocktail, CocktailPicture, Cocktail_Ingredient, Ingredient } = require("../../db/models");
const cache = new nodeCache(3600);
const router = express_1.default.Router();
// route to get specific cocktail and its ingredients
router.get('/cocktail/:id', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let cocktail;
    if (yield redis_1.default.exists(`cocktail_${+id}`)) {
        cocktail = yield redis_1.default.get(`cocktail_${+id}`);
        return res.status(200).send(cocktail);
    }
    try {
        cocktail = yield Cocktail.findByPk(+id, {
            include: [
                { model: Cocktail_Ingredient, include: [{ model: Ingredient }] },
                { model: CocktailPicture }
            ]
        });
        yield redis_1.default.set(`cocktail_${+id}`, JSON.stringify(cocktail));
        return res.status(200).json(cocktail);
    }
    catch (e) {
        next(e);
    }
})));
// route to get a random picture
router.get('/random_picture', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let pictures;
    if (yield redis_1.default.exists('cocktail_pictures')) {
        pictures = yield redis_1.default.get('cocktail_pictures');
    }
    else {
        pictures = yield CocktailPicture.findAll();
    }
    const random_number = Math.floor(Math.random() * (pictures.length) + 1);
    let randomPicture = pictures[random_number];
    if (!randomPicture) {
        while (!randomPicture) {
            const random_number = Math.floor(Math.random() * (pictures.length) + 1);
            randomPicture = pictures[random_number];
        }
    }
    return res.json(randomPicture.location);
})));
// route to get random cocktail and its ingredients
router.get('/random_cocktail', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const random_number = Math.floor(Math.random() * 77 + 1);
    let cocktail;
    if (yield redis_1.default.exists(`cocktail_${random_number}`)) {
        cocktail = yield redis_1.default.get(`cocktail_${random_number}`);
        return res.status(200).json(cocktail);
    }
    try {
        cocktail = yield Cocktail.findByPk(random_number, {
            include: [
                { model: Cocktail_Ingredient, include: [{ model: Ingredient }] },
                { model: CocktailPicture }
            ]
        });
        yield redis_1.default.set(`cocktail_${random_number}`, JSON.stringify(cocktail));
        return res.status(200).json(cocktail);
    }
    catch (e) {
        next(e);
    }
})));
// route to get all cocktails and their ingredients
router.get('/', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let cocktails;
    if (yield redis_1.default.exists('cocktails')) {
        cocktails = yield redis_1.default.get('cocktails');
        return res.status(200).send(cocktails);
    }
    try {
        cocktails = yield Cocktail.findAll({
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
        yield redis_1.default.set('cocktails', JSON.stringify(cocktails));
        return res.status(200).json(cocktails);
    }
    catch (e) {
        next(e);
    }
})));
// route to get all stock ingredients
router.get("/ingredients", asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let ingredients;
    if (yield redis_1.default.exists('ingredients')) {
        ingredients = yield redis_1.default.get('ingredients');
        return res.status(200).send(ingredients);
    }
    try {
        ingredients = yield Ingredient.findAll();
        yield redis_1.default.set('ingredients', JSON.stringify(ingredients));
        return res.status(200).json(ingredients);
    }
    catch (e) {
        next(e);
    }
})));
// route to get ingredients and drinks that can be made with them
router.get("/by_ingredients", asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let ingredientsAndDrinks;
    if (yield redis_1.default.exists('ingredientsAndDrinks')) {
        ingredientsAndDrinks = yield redis_1.default.get('ingredientsAndDrinks');
        return res.status(200).send(ingredientsAndDrinks);
    }
    try {
        ingredientsAndDrinks = yield Ingredient.findAll({
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
        yield redis_1.default.set('ingredientsAndDrinks', JSON.stringify(ingredientsAndDrinks));
        return res.status(200).json(ingredientsAndDrinks);
    }
    catch (e) {
        next(e);
    }
})));
module.exports = router;
