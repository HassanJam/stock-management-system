const express = require('express');
const router = express.Router();
const pool = require('../db');

// CRUD routes for stock transactions
router.post('/', async (req, res) => {
    const { itemId, transactionType, quantity } = req.body;
    try {
        const [newTransaction] = await pool.query(
            'INSERT INTO stockTransactions (itemId, transactionType, quantity) VALUES (?, ?, ?)',
            [itemId, transactionType, quantity]
        );
        res.status(201).json(newTransaction);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
