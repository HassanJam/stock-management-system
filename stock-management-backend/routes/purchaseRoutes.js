const express = require('express');
const router = express.Router();
const pool = require('../db');

// CRUD routes for purchases
router.post('/', async (req, res) => {
    const { itemId, supplierId, quantity } = req.body;
    try {
        const [newPurchase] = await pool.query(
            'INSERT INTO purchases (itemId, supplierId, quantity) VALUES (?, ?, ?)',
            [itemId, supplierId, quantity]
        );
        res.status(201).json(newPurchase);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
