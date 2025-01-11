const express = require('express');
const router = express.Router();
const reservationStatusController = require('../controllers/reservationStatusesController');

router.get('/', reservationStatusController.getAllReservationStatuses);

router.get('/:id', reservationStatusController.getReservationStatusById);



module.exports = router;