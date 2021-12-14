import 'reflect-metadata';
import '@shared/container';
import 'express-async-errors';
import 'dotenv/config';

import { errors } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

import AppError from '@errors/AppError';
import routes from '@shared/infra/routes';
import connection from '@shared/infra/typeorm/';


const APP_PORT = process.env.APP_PORT || 3105;

connection();

const app = express();
app.use(cors({ credentials: true, origin: true }));

app.use(express.json());
app.use(routes);

app.use(errors());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.error(err);

  if (err instanceof AppError) {
    console.error(err);
    response.header('Access-Control-Allow-Origin', '*');
    response.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  if (err instanceof QueryFailedError) {
    return response.status(500).json({
      status: 'Query failed error',
      message: `Unexpected error: ${err.message}`,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});


app.listen(APP_PORT, () => {
  console.log(`▶️ Server started on port ${APP_PORT} !`);
});
