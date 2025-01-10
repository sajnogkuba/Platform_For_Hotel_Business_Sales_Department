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
            res.status(404).send('Reservation not found');
        } else {
            res.json(results[0]);
        }
    });
});

module.exports = router;