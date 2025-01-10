const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
   db.query('SELECT * FROM Users', (err, results) => {
       if (err) {
           res.status(500).json({ error: err.message });
       } else{
           res.status(200).json(results);
       }
   });
});

router.get('/:id', (req, res) => {
   db.query('SELECT * FROM Users WHERE id = ?', [req.params.id], (err, results) => {
       if (err) {
           res.status(500).json({ error: err.message });
       } else if (results.length === 0) {
           res.status(404).json({ error: 'User not found' });
       } else {
           res.status(200).json(results[0]);
       }
   });
});

router.post('/', (req, res) => {
    const { name, email, password, role_id, phone } = req.body;
    db.query('INSERT INTO Users (name, email, password, Role_id, phone) VALUES (?, ?, ?, ?, ?)', [name, email, password, role_id, phone], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: result.insertId });
        }
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, password, role_id, phone } = req.body;
    db.query('UPDATE Users SET name = ?, email = ?, password = ?, Role_id = ?, phone = ? WHERE id = ?', [name, email, password, role_id, phone, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).json({ message: 'User updated successfully', id: id });
        }
    });
});

router.delete('/:id', (req, res) => {
   const { id } = req.params;
    db.query('DELETE FROM Users WHERE id = ?', [id], (err, result) => {
         if (err) {
              res.status(500).json({ error: err.message });
         } else if (result.affectedRows === 0) {
              res.status(404).json({ error: 'User not found' });
         } else {
              res.status(200).json({ message: 'User deleted successfully', id: id });
         }
    });
});

module.exports = router;