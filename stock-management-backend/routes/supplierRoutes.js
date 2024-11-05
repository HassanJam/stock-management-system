const express = require('express');
const router = express.Router();
const pool = require('../db');

// CRUD routes for suppliers
router.post('/', async (req, res) => {
    const { name, contact, email } = req.body;
    try {
        const [newSupplier] = await pool.query(
            'INSERT INTO suppliers (name, contact, email) VALUES (?, ?, ?)',
            [name, contact, email]
        );
        res.status(201).json(newSupplier);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get all suppliers
router.get('/', async (req, res) => {
    try {
        const [suppliers] = await pool.query('SELECT * FROM suppliers');
        res.json(suppliers);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
