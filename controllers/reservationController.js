const reservationServices = require('../services/reservationServices');
const joi = require('joi');

const reservationSchema = joi.object({
    buyer_id: joi.number().integer().required(),
    created_by: joi.number().integer().required(),
    start_date: joi.date().required(),
    end_date: joi.date().greater(joi.ref('start_date')).required(),
    reservation_status_id: joi.number().integer().required(),
    halls: joi.array().items(
        joi.object({
            hall_id: joi.number().integer().required(),
            price: joi.number().precision(2).required(),
        })
    ).min(1).required(),
});

const validateReservation = (data) => {
    const { error, value } = reservationSchema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
    if (hasDuplicateHalls(value.halls)) {
        throw new Error('Halls must be unique');
    }
    return value;
}

const hasDuplicateHalls = (halls) => {
    const hallIds = halls.map(hall => hall.hall_id);
    return new Set(hallIds).size !== hallIds.length;
}

exports.getAllReservations = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try{
        const reservations = await reservationServices.getAllReservations(parseInt(page), parseInt(limit));
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getReservationById = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await reservationServices.getReservationById(id);
        if (reservation) {
            res.status(200).json(reservation);
        } else {
            res.status(404).json({ error: 'Reservation not found', id: id });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.createReservation = async (req, res) => {
    try {
        const reservation = validateReservation(req.body);

        const areAvailable = await reservationServices.areHallsAvailable(
            reservation.halls,
            reservation.start_date,
            reservation.end_date
        );

        if (!areAvailable) {
            return res.status(400).json({ error: 'One or more halls are already reserved during this period' });
        }

        const createdReservationId = await reservationServices.createReservation(reservation);
        res.status(201).json({ id: createdReservationId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateReservation = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = validateReservation(req.body);
        const updated = await reservationServices.updateReservation(id, reservation);
        if (updated) {
            res.status(200).json({ message: 'Reservation updated successfully', id: id });
        } else {
            res.status(404).json({ error: 'Reservation not found', id: id });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteReservation = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await reservationServices.deleteReservation(id);
        if (deleted) {
            res.status(200).json({ message: 'Reservation deleted successfully', id: id });
        } else {
            res.status(404).json({ error: 'Reservation not found', id: id });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}