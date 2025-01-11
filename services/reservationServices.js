const db = require('../db');

exports.getAllReservations = (page, limit) => {
    return new Promise((resolve, reject) => {
        const offset = (page - 1) * limit;
        db.query('SELECT * FROM Reservations LIMIT ? OFFSET ?', [parseInt(limit), parseInt(offset)], (err, results) => {
            if (err) {
                reject(err);
            } else {
                db.query('SELECT COUNT(*) AS total FROM Reservations', (err, countResults) => {
                    if (err) {
                        reject(err);
                    } else {
                        const total = countResults[0].total;
                        resolve({ total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / limit), data: results });
                    }
                });
            }
        });
    });
};

exports.getReservationById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Reservations WHERE id = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length === 0) {
                return resolve(null);
            }

            const reservation = results[0];

            db.query(
                'SELECT Halls.*, Reservation_Halls.price FROM Halls INNER JOIN Reservation_Halls ON Halls.id = Reservation_Halls.Halls_id WHERE Reservation_Halls.Reservations_id = ?', [id], (err, halls) => {
                    if (err) {
                        return reject(err);
                    }

                   return resolve({ ...reservation, halls });
                }
            );
        });
    });

};

exports.createReservation = (reservation) => {
    const { buyer_id, created_by, start_date, end_date, reservation_status_id, halls } = reservation;

    return new Promise((resolve, reject) => {
        db.beginTransaction((transactionErr) => {
            if (transactionErr){
                return reject(transactionErr);
            }
            db.query(
                'INSERT INTO Reservations (buyer_id, created_by, start_date, end_date, Reservation_Statuses_id) VALUES (?, ?, ?, ?, ?)', [buyer_id, created_by, start_date, end_date, reservation_status_id], (err, result) => {
                    if (err) {
                        return db.rollback(() => reject(err));
                    }

                    const reservationId = result.insertId;
                    const reservationHallsData = halls.map(hall => [reservationId, hall.hall_id, hall.price]);
                    db.query(
                        'INSERT INTO Reservation_Halls (Reservations_id, Halls_id, price) VALUES ?', [reservationHallsData], (err) => {
                            if (err) {
                                return db.rollback(() => reject(err));
                            }
                            db.commit((commitErr) => {
                                if (commitErr) {
                                    return db.rollback(() => reject(commitErr));
                                }
                                resolve(reservationId);
                            });
                        }
                    );
                }
            );
        });
    });
};

exports.updateReservation = (id, reservation) => {
    const { buyer_id, created_by, start_date, end_date, reservation_status_id, halls } = reservation;

    return new Promise((resolve, reject) => {
        db.beginTransaction((transactionErr) => {
            if (transactionErr){
                return reject(transactionErr);
            }
            db.query(
                'UPDATE Reservations SET buyer_id = ?, created_by = ?, start_date = ?, end_date = ?, Reservation_Statuses_id = ? WHERE id = ?', [buyer_id, created_by, start_date, end_date, reservation_status_id, id], (err, result) => {
                    if (err) {
                        return db.rollback(() => reject(err));
                    }
                    if (result.affectedRows === 0) {
                        return db.rollback(() => resolve(false));
                    }
                    db.query(
                        'DELETE FROM Reservation_Halls WHERE Reservations_id = ?', [id], (err) => {
                            if (err) {
                                return db.rollback(() => reject(err));
                            }
                            const reservationHallsData = halls.map(hall => [id, hall.hall_id, hall.price]);
                            db.query(
                                'INSERT INTO Reservation_Halls (Reservations_id, Halls_id, price) VALUES ?', [reservationHallsData], (err) => {
                                    if (err) {
                                        return db.rollback(() => reject(err));
                                    }
                                    db.commit((commitErr) => {
                                        if (commitErr) {
                                            return db.rollback(() => reject(commitErr));
                                        }
                                        resolve(true);
                                    });
                                }
                            );
                        }
                    );
                }
            );
        });
    });
};

exports.deleteReservation = (id) => {
    return new Promise((resolve, reject) => {
        db.beginTransaction((transactionErr) => {
            if (transactionErr){
                return reject(transactionErr);
            }
            db.query(
                'DELETE FROM Reservation_Halls WHERE Reservations_id = ?', [id], (err) => {
                    if (err) {
                        return db.rollback(() => reject(err));
                    }
                    db.query(
                        'DELETE FROM Reservations WHERE id = ?', [id], (err, result) => {
                            if (err) {
                                return db.rollback(() => reject(err));
                            }
                            if (result.affectedRows === 0) {
                                return db.rollback(() => resolve(false));
                            }
                            db.commit((commitErr) => {
                                if (commitErr) {
                                    return db.rollback(() => reject(commitErr));
                                }
                                resolve(true);
                            });
                        }
                    );
                }
            );
        });
    });
};

exports.isHallAvailable = (hall_id, start_date, end_date) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT *
             FROM Reservation_Halls
             INNER JOIN Reservations
             ON Reservation_Halls.Reservations_id = Reservations.id
             WHERE Reservation_Halls.Halls_id = ?
               AND (
                 (Reservations.start_date <= ? AND Reservations.end_date >= ?) OR
                 (Reservations.start_date >= ? AND Reservations.start_date <= ?)
               )`,
            [hall_id, end_date, start_date, start_date, end_date],
            (err, results) => {
                if (err) return reject(err);
                resolve(results.length === 0);
            }
        );
    });
};

exports.areHallsAvailable = (halls, start_date, end_date) => {
    const availabilityPromises = halls.map(hall => {
        return this.isHallAvailable(hall.hall_id, start_date, end_date);
    });

    return Promise.all(availabilityPromises).then(results => {
        return results.every(isAvailable => isAvailable);
    });
};
