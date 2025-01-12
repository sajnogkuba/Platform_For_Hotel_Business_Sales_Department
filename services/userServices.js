const db = require('../db');

exports.getAllUsers = (page, limit) => {
    return new Promise((resolve, reject) => {
        const offset = (page - 1) * limit;
        db.query('SELECT Users.*, Roles.name AS role_name FROM Users INNER JOIN Roles ON Users.Role_id = Roles.id LIMIT ? OFFSET ?', [parseInt(limit), parseInt(offset)], (err, results) => {
            if (err) {
                reject(err);
            } else {
                db.query('SELECT COUNT(*) AS total FROM Users', (err, countResults) => {
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

exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT Users.*, Roles.name AS role_name FROM Users INNER JOIN Roles ON Users.Role_id = Roles.id WHERE Users.id = ?', [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0] || null);
            }
        });
    });
};

exports.createUser = (user) => {
    const { name, email, password, role_id, phone } = user;
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO Users (name, email, password, role_id, phone) VALUES (?, ?, ?, ?, ?)', [name, email, password, role_id, phone], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.insertId);
            }
        });
    });
};

exports.updateUser = (id, user) => {
    const { name, email, password, role_id, phone } = user;
    return new Promise((resolve, reject) => {
        db.query('UPDATE Users SET name = ?, email = ?, password = ?, role_id = ?, phone = ? WHERE id = ?', [name, email, password, role_id, phone, id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.affectedRows > 0);
            }
        });
    });
};

exports.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM Users WHERE id = ?', [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.affectedRows > 0);
            }
        });
    });
};

exports.checkIfUserExists = async (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Users WHERE email = ?', [email], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.length > 0);
            }
        });
    });
};

exports.getUserByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Users WHERE email = ?', [email], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0] || null);
            }
        });
    });
};