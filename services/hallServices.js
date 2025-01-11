const db = require('../db');

exports.getAllHalls = (page, limit) => {
    return new Promise((resolve, reject) => {
        const offset = (page - 1) * limit;
        db.query('SELECT * FROM Halls LIMIT ? OFFSET ?', [parseInt(limit), parseInt(offset)], (err, results) => {
            if (err) {
                reject(err);
            } else {
                db.query('SELECT COUNT(*) AS total FROM Halls', (err, countResults) => {
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
}

exports.getHallById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Halls WHERE id = ?', [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0] || null);
            }
        });
    });
}

exports.createHall = (hall) => {
    const { name, price_per_hour, square_meters } = hall;
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO Halls (name, price_per_hour, square_meters) VALUES (?, ?, ?)', [name, price_per_hour, square_meters], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.insertId);
            }
        });
    });
}

exports.updateHall = (id, hall) => {
    const { name, price_per_hour, square_meters } = hall;
    return new Promise((resolve, reject) => {
        db.query('UPDATE Halls SET name = ?, price_per_hour = ?, square_meters = ? WHERE id = ?', [name, price_per_hour, square_meters, id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.affectedRows > 0);
            }
        });
    });
}

exports.deleteHall = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM Halls WHERE id = ?', [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.affectedRows > 0);
            }
        });
    });
}