const express = require('express');
const router = express.Router();
const pool = require('../db'); // Adjust this if your db connection is in another file

// Login route

// Get all stocks
router.get('/', async (req, res) => {
    try {
        const [stocks] = await pool.query('SELECT * FROM users');
        res.json(stocks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    console.log('Logging in with', { username, password }); // Log the credentials

    try {
        // Correctly handle the result from the query
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(401).send('Invalid username or password');
        }

        const user = rows[0]; // Get the user object from the rows array

        // Check the password (you should have hashing logic in place)
        if (user.password !== password) { // Here you may want to use bcrypt for password comparison
            return res.status(401).send('Invalid username or password');
        }

        console.log('User found:', user);
        // If authentication is successful, return success response
        return res.status(200).json({ message: 'Login successful', token: 'someToken', department: user.department });
    } catch (err) {
        console.error('Login error:', err.message);
        return res.status(500).send('Server Error');
    }
});


module.exports = router;
