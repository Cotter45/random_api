import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { ValidationError } from 'sequelize';

import routes from './routes';
import environment from './config';
const isProduction = environment.environment === "production";
import winston from './utils/winston';
import { stream } from './utils/winston';
  
const app = express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream }));

app.use(express.json());
app.use(cors());

app.use("/static", express.static(path.join(__dirname, 'public')));

app.use(routes); // Connect all the routes

// Catch unhandled requests and forward to error handler.
app.use((_req: Request, _res: Response, next: NextFunction) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// Process sequelize errors
app.use((err: any, _req: Request, _res: Response, next: NextFunction) => {
  let error;
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    error = new Error("Validation Error");
    error.status = 500;
    error.errors = err.errors.map((e: Error) => e.message);
    error.title = 'Validation error';
  }
  next(error);
});

// Error formatter
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status || 500);
  console.error(err);
  winston.error(`${err.status || 500} - ${err.message} - ${_req.originalUrl} - ${_req.method} - ${_req.ip}`);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

export = app;