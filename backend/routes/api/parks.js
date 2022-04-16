const express = require("express");
const asyncHandler = require("express-async-handler");
const nodeCache = require('../../utils/cache');

const { requireAuth } = require("../../utils/auth");
const { Park, State, ParkPicture } = require("../../db/models");

const cache = new nodeCache(3600);

const router = express.Router();


router.get('/oops', asyncHandler( async (req, res, next) => {

  const pictures = await ParkPicture.findAll();

  const mapped = pictures.map(picture => {
    return {
      park_id: picture.park_id,
      location: picture.location,
      createdAt: picture.createdAt,
      updatedAt: picture.updatedAt
    }
  })

  console.log(mapped);
  return res.json(mapped)
}))
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
      cache.set('parks', parks);
    }
  
    return res.json(parks);
  } catch (e) {
    next(e)
  }
}))




module.exports = router;