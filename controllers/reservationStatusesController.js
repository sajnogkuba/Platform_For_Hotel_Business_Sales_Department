const reservationStatusesService = require('../services/reservationStatusesService');

exports.getAllReservationStatuses = (req, res) => {
    reservationStatusesService.getAllReservationStatuses()
        .then(results => res.status(200).json(results))
        .catch(err => res.status(500).json({ error: err.message }));
}

exports.getReservationStatusById = (req, res) => {
    const { id } = req.params;
    reservationStatusesService.getReservationStatusById(id)
        .then(results => {
            if (results) {
                res.status(200).json(results);
            } else {
                res.status(404).json({ error: 'Reservation status not found', id: id });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
}