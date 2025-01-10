const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
   db.query('SELECT * FROM Halls LIMIT ? OFFSET ?', [parseInt(limit), parseInt(offset)], (err, results) => {
       if (err) {
           res.status(500).json({ error: err.message });
       } else{
              db.query('SELECT COUNT(*) AS total FROM Halls', (err, countResults) => {
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
   db.query('SELECT * FROM Halls WHERE id = ?', [req.params.id], (err, results) => {
       if (err) {
           res.status(500).json({ error: err.message });
       } else if (results.length === 0) {
           res.status(404).json({ error: 'Hall not found' });
       } else {
           res.status(200).json(results[0]);
       }
   });
});

router.post('/', (req, res) => {
    const { name, price_per_hour, square_meters } = req.body;
    db.query('INSERT INTO Halls (name, price_per_hour, square_meters) VALUES (?, ?, ?)', [name, price_per_hour, square_meters], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: result.insertId });
        }
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, price_per_hour, square_meters } = req.body;
    db.query('UPDATE Halls SET name = ?, price_per_hour = ?, square_meters = ? WHERE id = ?', [name, price_per_hour, square_meters, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Hall not found' });
        } else {
            res.status(200).json({ message: 'Hall updated successfully', id: id });
        }
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Halls WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Hall not found' });
        } else {
            res.status(200).json({ message: 'Hall deleted successfully', id: id });
        }
    });
});

module.exports = router;