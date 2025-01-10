const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM Reservations', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else{
            res.status(200).json(results);
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
            res.status(200).json(results[0]);
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

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { buyer_id, created_by, start_date, end_date, reservation_status_id } = req.body;
    db.query('UPDATE Reservations SET buyer_id = ?, created_by = ?, start_date = ?, end_date = ?, Reservation_Statuses_id = ? WHERE id = ?', [buyer_id, created_by, start_date, end_date, reservation_status_id, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Reservation not found' });
        } else {
            res.status(200).json({ message: 'Reservation updated successfully', id: id });
        }
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Reservations WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Reservation not found' });
        } else {
            res.status(200).json({ message: 'Reservation deleted successfully', id: id });
        }
    });
});

module.exports = router;