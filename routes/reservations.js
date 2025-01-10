const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM Reservations', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

router.get('/:id', (req, res) => {
    db.query('SELECT * FROM Reservations WHERE id = ?', [req.params.id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Reservation not found' });
        } else {
            res.json(results[0]);
        }
    });
});

router.post('/', (req, res) => {
    const { buyer_id, created_by, start_date, end_date, reservation_status_id } = req.body;
    db.query('INSERT INTO Reservations (buyer_id, created_by, start_date, end_date, Reservation_Statuses_id) VALUES (?, ?, ?, ?, ?)', [buyer_id, created_by, start_date, end_date, reservation_status_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: result.insertId });
    });
});

module.exports = router;