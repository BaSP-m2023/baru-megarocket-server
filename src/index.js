// use "import" to import libraries
import express from 'express';
import cors from 'cors';

// use "require" to import JSON files
// const admins = require('./data/admins.json');
const activityRouter = require('./resources/activity');
// const member = require('./data/member.json');
const membersRouter = require('./resources/member');
const trainersRouter = require('./resources/trainer');

const adminsRouter = require('./resources/admins');

const app = express();

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/member', membersRouter);
app.use('/trainer', trainersRouter);
app.use('/admins', adminsRouter);

app.use('/activities', activityRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.get('/admins', (req, res) => {
//   res.status(200).json({
//     data: admins,
//   });
// });

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
