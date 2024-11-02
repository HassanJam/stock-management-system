// /backend/models/userModel.js
const db = require('../db');

const User = {
    findByUsername: (username, callback) => {
        const sql = 'SELECT * FROM users WHERE username = ?';
        db.query(sql, [username], (err, results) => {
            callback(err, results);
        });
    },
    create: (userData, callback) => {
        const sql = 'INSERT INTO users (username, password, department) VALUES (?, ?, ?)';
        db.query(sql, [userData.username, userData.password, userData.department], (err, results) => {
            callback(err, results);
        });
    },
};

module.exports = User;
