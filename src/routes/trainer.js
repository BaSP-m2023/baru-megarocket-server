const express = require('express');

const router = express.Router();

const trainerController = require('../controllers/trainer');

router.get('/', trainerController.getTrainer);

router.put();

router.post();
