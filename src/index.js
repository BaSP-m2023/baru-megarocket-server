// use "import" to import libraries
import express from 'express';
import cors from 'cors';

// use "require" to import JSON files
const admins = require('./data/admins.json');
const subscriptions = require('./resources/subscription');

// const member = require('./data/member.json')
// const membersRouter = require('./resources/member');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use('/member', membersRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.use('/subscriptions', subscriptions);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
