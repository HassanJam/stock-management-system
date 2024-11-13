const express = require('express');
const router = express.Router();
const pool = require('../db'); // Ensure this uses mysql2/promise

// Create a new user
router.post('/', async (req, res) => {
    const { username, password, department } = req.body;
    try {
        const [newUser] = await pool.query(
            'INSERT INTO users (username, password, department) VALUES (?, ?, ?)',
            [username, password, department]
        );
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const [users] = await pool.query('SELECT * FROM users');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (user.length === 0) {
            return res.status(404).send('User not found');
        }
        res.json(user[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching user' });
    }
});

// Update user
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, password, department } = req.body;
    try {
        await pool.query(
            'UPDATE users SET username = ?, password = ?, department = ? WHERE id = ?',
            [username, password, department, id]
        );
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating user' });
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        res.status(204).send(); // No content
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting user' });
    }
});

module.exports = router;
