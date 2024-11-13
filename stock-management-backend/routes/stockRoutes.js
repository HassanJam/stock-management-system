const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import the database connection pool

// Add a new stock item
router.post('/', async (req, res) => {
    const { itemName, brand, quantity, unit, cost, serialNo, quality, supplierId } = req.body;
    try {
        const [result] = await pool.query(
            `INSERT INTO stocks (itemName, brand, quantity, unit, cost, serialNo, quality, supplierId)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [itemName, brand, quantity, unit, cost, serialNo, quality, supplierId]
        );
        res.status(201).json({ id: result.insertId, message: 'Stock item created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get all stock items
router.get('/', async (req, res) => {
    try {
        const [stocks] = await pool.query(
            `SELECT stocks.id, stocks.itemName, stocks.brand, stocks.quantity, 
                    stocks.unit, stocks.cost, stocks.serialNo, stocks.quality, 
                    suppliers.name AS supplierName, stocks.createdAt, stocks.updatedAt
             FROM stocks
             JOIN suppliers ON stocks.supplierId = suppliers.id`
        );
        res.json(stocks);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get a specific stock item by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [stock] = await pool.query(
            `SELECT stocks.*, suppliers.name AS supplierName 
             FROM stocks 
             JOIN suppliers ON stocks.supplierId = suppliers.id 
             WHERE stocks.id = ?`,
            [id]
        );
        
        if (stock.length === 0) {
            return res.status(404).json({ message: 'Stock item not found' });
        }
        
        res.json(stock[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update a stock item
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { itemName, brand, quantity, unit, cost, serialNo, quality, supplierId } = req.body;
    try {
        const [result] = await pool.query(
            `UPDATE stocks
             SET itemName = ?, brand = ?, quantity = ?, unit = ?, cost = ?, serialNo = ?, quality = ?, supplierId = ?
             WHERE id = ?`,
            [itemName, brand, quantity, unit, cost, serialNo, quality, supplierId, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Stock item not found' });
        }
        res.json({ message: 'Stock item updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete a stock item
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM stocks WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Stock item not found' });
        }
        res.json({ message: 'Stock item deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
