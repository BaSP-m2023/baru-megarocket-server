/* eslint-disable import/no-extraneous-dependencies */
// use "import" to import libraries
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

const port = process.env.PORT || 4000;

dotenv.config();

mongoose
  .connect(process.env.DB_URL, { maxPoolSize: process.env.MONGO_POOLSIZE || 1 })
  // eslint-disable-next-line no-console
  .then(() => console.log('Connected to MR DB'))
  // eslint-disable-next-line no-console
  .catch((e) => console.log('Error: ', e));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
