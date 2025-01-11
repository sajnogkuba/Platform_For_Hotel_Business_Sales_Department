const express = require('express');
const router = express.Router();
const db = require('../db');
const hallController = require('../controllers/hallController');

router.get('/', hallController.getAllHalls);

router.get('/:id', hallController.getHallById);

router.post('/', hallController.createHall);

router.put('/:id', hallController.updateHall);

router.delete('/:id', hallController.deleteHall);

module.exports = router;