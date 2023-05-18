// use "import" to import libraries
import express from 'express';
import cors from 'cors';
// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 4000;
const generalRoute = require('./routes/index');

mongoose
  .connect('mongodb+srv://baru-team:x60lbGF6arRYrycR@megarocket-databases.inpprte.mongodb.net/baru-database', { maxPoolSize: process.env.MONGO_POOLSIZE || 1 })
  // eslint-disable-next-line no-console
  .then(() => console.log('Connected to MR DB'))
  // eslint-disable-next-line no-console
  .catch((e) => console.log('Error: ', e));

app.use(cors());
app.use(express.json());
app.use('/api', generalRoute);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
