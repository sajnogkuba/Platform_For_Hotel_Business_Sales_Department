const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    db.query('SELECT * FROM Reservations LIMIT ? OFFSET ?', [parseInt(limit), parseInt(offset)], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else{

            db.query('SELECT COUNT(*) AS total FROM Reservations', (err, countResults) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    const total = countResults[0].total;
                    res.status(200).json({ total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / limit), data: results });
                }
            });
        }
    });
});

router.get('/:id', (req, res) => {
    db.query('SELECT * FROM Reservations WHERE id = ?', [req.params.id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Reservation not found' });
        } else {
            const reservation = results[0];

            db.query('SELECT Halls.*, Reservation_Halls.price FROM Reservation_Halls INNER JOIN Halls ON Reservation_Halls.Halls_id = Halls.id WHERE Reservation_Halls.Reservations_id = ?', [req.params.id], (err, halls) => {
               if (err) {
                   res.status(500).json({ error: err.message });
               } else {
                   res.status(200).json({ ...reservation, halls });
               }
            });
        }
    });
});

router.post('/', (req, res) => {
    const { buyer_id, created_by, start_date, end_date, reservation_status_id, halls } = req.body;
    db.query('INSERT INTO Reservations (buyer_id, created_by, start_date, end_date, Reservation_Statuses_id) VALUES (?, ?, ?, ?, ?)', [buyer_id, created_by, start_date, end_date, reservation_status_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {

            const reservationId = result.insertId;
            const reservationHallsData = halls.map(hall => [reservationId, hall.hall_id, hall.price]);
            db.query('INSERT INTO Reservation_Halls (Reservations_id, Halls_id, price) VALUES ?', [reservationHallsData], (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(201).json({ id: reservationId });
                }
            });


        }
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { buyer_id, created_by, start_date, end_date, reservation_status_id, halls } = req.body;
    db.query('UPDATE Reservations SET buyer_id = ?, created_by = ?, start_date = ?, end_date = ?, Reservation_Statuses_id = ? WHERE id = ?', [buyer_id, created_by, start_date, end_date, reservation_status_id, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Reservation not found' });
        } else {
            db.query('DELETE FROM Reservation_Halls WHERE Reservations_id = ?', [id], (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    const reservationHallsData = halls.map(hall => [id, hall.hall_id, hall.price]);
                    db.query('INSERT INTO Reservation_Halls (Reservations_id, Halls_id, price) VALUES ?', [reservationHallsData], (err, result) => {
                        if (err) {
                            res.status(500).json({ error: err.message });
                        } else {
                            res.status(200).json({ message: 'Reservation updated successfully', id: id });
                        }
                    });
                }
            });
        }
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Reservation_Halls WHERE Reservations_id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            db.query('DELETE FROM Reservations WHERE id = ?', [id], (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Reservation not found' });
                } else {
                    res.status(200).json({ message: 'Reservation deleted successfully', id: id });
                }
            });
        }
    });
});

module.exports = router;