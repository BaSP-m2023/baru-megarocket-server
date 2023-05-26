/* eslint-disable no-console */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

const port = process.env.PORT || 4000;

dotenv.config();

mongoose
  .connect(process.env.DB_URL, { maxPoolSize: process.env.MONGO_POOLSIZE || 1 })
  .then(() => console.log('Connected to MR DB'))
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((e) => console.log('Error: ', e));
