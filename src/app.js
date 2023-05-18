import express from 'express';
import cors from 'cors';

const generalRoute = require('./routes/index');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', generalRoute);

export default app;
