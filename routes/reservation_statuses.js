const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM Reservation_statuses', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else{
            res.status(200).json(results);
        }
    });
});

router.get('/:id', (req, res) => {
    db.query('SELECT * FROM Reservation_statuses WHERE id = ?', [req.params.id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Reservation status not found' });
        } else {
            res.status(200).json(results[0]);
        }
    });
});


module.exports = router;