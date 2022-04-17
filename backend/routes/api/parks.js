const express = require("express");
const asyncHandler = require("express-async-handler");
const nodeCache = require('../../utils/cache');

const { Park, State, ParkPicture } = require("../../db/models");

const cache = new nodeCache(3600);

const router = express.Router();


// route to get a random park
router.get('/random_park', asyncHandler( async (req, res, next) => {

  const random_number = Math.floor(Math.random() * (59) + 1);

  try {
    let park;

    if (cache.has(`park_${random_number}`)) {
      park = cache.get(`park_${random_number}`);
    } else {
      park = await Park.findByPk(+random_number, {
        include: [
          { model: State },
          { model: ParkPicture }
        ]
      });

      park = JSON.parse(JSON.stringify(park));

      cache.set(`park_${random_number}`, park);
    }

    return res.json(park);
  } catch(e) {
    next(e);
  }

}))

// route to get a random picture
router.get('/random_picture', asyncHandler( async (req, res, next) => {

  const pictures = await ParkPicture.findAll();

  const random_number = Math.floor(Math.random() * (pictures.length - 1) + 1);

  const randomPicture = pictures[random_number];

  return res.json(randomPicture.location);
}));

// route to get individual park
router.get('/:id', asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    let park = cache.get(`park_${id}`);

    if (!park) {
      park = await Park.findByPk(+id, {
        include: [
          {model: State},
          {model: ParkPicture}
        ]
      });

      park = JSON.parse(JSON.stringify(park));

      cache.set(`park_${id}`, park);
    }

    return res.json(park);
  } catch(e) {
    next(e);
  }
}))

// route to get all parks and associated details
router.get('/', asyncHandler(async (req, res, next) => {

  try {
    let parks = cache.get('parks');
  
    if (!parks) {
      parks = await Park.findAll({
        include: [
          {model: State},
          {model: ParkPicture}
        ]
      })

      parks = JSON.parse(JSON.stringify(parks));

      cache.set('parks', parks);
    }
  
    return res.json(parks);
  } catch (e) {
    next(e)
  }
}))




module.exports = router;