// use "import" to import libraries
import express from 'express';
import cors from 'cors';

// use "require" to import JSON files
const subscriptions = require('./resources/subscription');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/subscriptions', subscriptions);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
