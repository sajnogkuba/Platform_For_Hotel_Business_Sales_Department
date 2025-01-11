const db = require('../db');

exports.getAllReservationStatuses = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Reservation_statuses', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

exports.getReservationStatusById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Reservation_statuses WHERE id = ?', [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0] || null);
            }
        });
    });
}