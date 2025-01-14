const db = require('../db');

exports.getAllRoles = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Roles', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

exports.getRoleById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Roles WHERE id = ?', [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0] || null);
            }
        });
    });
}

exports.checkIfRoleExists = (role_id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM Roles WHERE id = ?', [role_id], (err, results) => {
            if (err) return reject(err);
            resolve(results.length > 0);
        });
    });
};