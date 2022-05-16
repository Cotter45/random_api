import express, { Request, Response, NextFunction } from 'express';
const asyncHandler = require("express-async-handler");
import redisClient from '../../utils/redis';

const { Park, State, ParkPicture } = require("../../db/models");

const router = express.Router();

// route to get a random park
router.get('/random_park', asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
  const random_number = Math.floor(Math.random() * (59) + 1);

  try {
    let park;
    if (await redisClient.exists(`park_${random_number}`)) {
      park = await redisClient.get(`park_${random_number}`);
      return res.status(200).send(park);
    } else {
      park = await Park.findByPk(+random_number, {
        include: [
          { model: State },
          { model: ParkPicture }
        ]
      });
      await redisClient.set(`park_${random_number}`, JSON.stringify(park));
      return res.status(200).json(park);
    }
  } catch(e) {
      next(e);
  }
}));

// route to get a random picture
router.get('/random_picture', asyncHandler( async (req: Request, res: Response, next: NextFunction) => {

  let pictures;
  if (await redisClient.exists('park_pictures')) {
    pictures = await redisClient.get('park_pictures');
  } else {
    pictures = await ParkPicture.findAll();
  }

  const random_number = Math.floor(Math.random() * (pictures.length - 1) + 1);

  const randomPicture = pictures[random_number];

  return res.json(randomPicture.location);
}));

// route to get individual park
router.get('/:id', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    let park
    if (await redisClient.exists(`park_${id}`)) {
      park = await redisClient.get(`park_${id}`);
      return res.status(200).send(park);
    } else {
      park = await Park.findByPk(+id, {
        include: [
          {model: State},
          {model: ParkPicture}
        ]
      });
      await redisClient.set(`park_${id}`, JSON.stringify(park));
      return res.status(200).json(park);
    }
  } catch(e) {
      next(e);
  }
}))

// route to get all parks and associated details
router.get('/', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

  try {
    let parks;
    if (await redisClient.exists('parks')) {
      parks = await redisClient.get('parks');
      return res.status(200).send(parks);
    } else {
      parks = await Park.findAll({
        include: [
          {model: State},
          {model: ParkPicture}
        ]
      });
      await redisClient.set('parks', JSON.stringify(parks));
      return res.status(200).json(parks);
    }
  } catch (e) {
      next(e)
  }
}))

export = router;