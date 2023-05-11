// use "import" to import libraries
import express from 'express';
import cors from 'cors';
// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';

mongoose
  .connect('mongodb+srv://baru-team:x60lbGF6arRYrycR@megarocket-databases.inpprte.mongodb.net')
  .then(() => console.log('Connected to MR DB'))
  .catch((e) => console.log('Error: ', e));

// use "require" to import JSON files
const subscriptions = require('./controllers/subscription');
const membersRouter = require('./controllers/member');
const superAdminRouter = require('./controllers/super-admins');
const classRouter = require('./controllers/class');
const trainersRouter = require('./controllers/trainer');
const activityRouter = require('./controllers/activity');
const adminsRouter = require('./controllers/admins');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/subscriptions', subscriptions);
app.use('/member', membersRouter);
app.use('/super-admins', superAdminRouter);
app.use('/trainer', trainersRouter);
app.use('/admins', adminsRouter);
app.use('/class', classRouter);
app.use('/activity', activityRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
