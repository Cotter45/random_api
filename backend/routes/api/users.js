const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const multer = require('multer')
const sharp = require('sharp')
const storage = require('../../utils/upload-config')
const upload = multer(storage)
const path = require('path')
const fs = require('fs')

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, ParkPicture, Park } = require("../../db/models");


const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// Get logs
router.get('/logs',requireAuth, asyncHandler( async (req, res) => {

  const date = new Date(Date.now());
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  
  if (month < 10) month = '0' + `${month}`;
  if (day < 10) day = '0' + `${day}`;

  const file = `info-${year}-${month}-${day}.log`;
  const route = path.resolve('logs');

  const infoLogs = fs.readFileSync(`${route}/${file}`, 'utf8');
  return res.send([ infoLogs ])
}))

// Save image
router.post('/save_image', requireAuth, upload.single('image') ,asyncHandler( async (req, res) => {
   const { filename: image } = req.file 
   let { park } = req.body;
   park = JSON.parse(park);
   const park_id = +park["park_id"];
   const location = park["location"];

   await sharp(req.file.path)
    .resize(500)
    .png({quality: 50})
    .toFile(
        path.resolve(req.file.destination, 'resized', image.split('.')[0] + '.png')
    )
    fs.unlinkSync(req.file.path)
      console.log(park, "PARK", park_id, location)
    await ParkPicture.create({ park_id: +park_id, location })

    return res.json({ message: 'success' })
}))

module.exports = router;