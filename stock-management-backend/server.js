const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err);
        return;
    }
    console.log('Connected to the database');
});
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Import stock routes
const stockRoutes = require('./routes/stock'); // Add this line
app.use('/api/stocks', stockRoutes); // And this line

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
