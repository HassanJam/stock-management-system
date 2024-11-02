// StockRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Ensure this uses mysql2/promise

// Add stock
router.post('/', async (req, res) => {
    const { itemName, itemType, quantity, category } = req.body;
    try {
        const [newStock] = await pool.query(
            'INSERT INTO stocks (itemName, itemType, quantity, category) VALUES (?, ?, ?, ?)',
            [itemName, itemType, quantity, category]
        );
        res.json(newStock);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get all stocks
router.get('/', async (req, res) => {
    try {
        const [stocks] = await pool.query('SELECT * FROM stocks');
        res.json(stocks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// Get single stock by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [stock] = await pool.query('SELECT * FROM stocks WHERE id = ?', [id]);
        if (stock.length === 0) {
            return res.status(404).send('Stock not found');
        }
        res.json(stock[0]); // Send the first stock object found
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching stock' });
    }
});


// Update stock
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { itemName, itemType, quantity, category } = req.body;
    try {
        await pool.query(
            'UPDATE stocks SET itemName = ?, itemType = ?, quantity = ?, category = ? WHERE id = ?',
            [itemName, itemType, quantity, category, id]
        );
        res.status(200).json({ message: 'Stock updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating stock', error });
    }
});


// Delete stock
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM stocks WHERE id = ?', [id]);
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: 'Error deleting stock', error });
    }
});

module.exports = router;
