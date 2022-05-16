import express, { Request, Response } from 'express';
const asyncHandler = require("express-async-handler");
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Get logs
router.get('/logs', asyncHandler( async (req: Request, res: Response) => {

  const date = new Date(Date.now());
  const year = date.getFullYear();
  let month: any = date.getMonth() + 1;
  let day: any = date.getDate();
  
  if (month < 10) month = '0' + `${month}`;
  if (day < 10) day = '0' + `${day}`;

  const file = `info-${year}-${month}-${day}.log`;
  const route = path.resolve('logs');

  const infoLogs = fs.readFileSync(`${route}/${file}`, 'utf8');
  return res.send([ infoLogs ])
}))


export = router;