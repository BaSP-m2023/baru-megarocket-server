// use "import" to import libraries
import express from 'express';
import cors from 'cors';

// use "require" to import JSON files
const subscriptions = require('./resources/subscription');
const membersRouter = require('./resources/member');
const superAdminRouter = require('./resources/super-admins');
const classRouter = require('./resources/class');
const trainersRouter = require('./resources/trainer');
const activityRouter = require('./resources/activity');
const adminsRouter = require('./resources/admins');

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
