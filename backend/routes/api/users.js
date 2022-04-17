const express = require("express");
const asyncHandler = require("express-async-handler");
const path = require('path')
const fs = require('fs')

const router = express.Router();

// Get logs
router.get('/logs', asyncHandler( async (req, res) => {

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


module.exports = router;