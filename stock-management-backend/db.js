// db.js
const mysql = require('mysql2/promise'); // Ensure you're using mysql2/promise

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'stockManagement',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});




module.exports = pool; // Export the pool
