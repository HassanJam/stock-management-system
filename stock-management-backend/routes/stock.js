// StockRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Ensure this uses mysql2/promise

// Add stock
router.post('/', async (req, res) => {
    const { item_name, item_type, quantity, category_id, supplier_id } = req.body; // Use category_id and supplier_id
    try {
        const [newStock] = await pool.query(
            'INSERT INTO stocks (item_name, item_type, quantity, category_id, supplier_id) VALUES (?, ?, ?, ?, ?)',
            [item_name, item_type, quantity, category_id, supplier_id]
        );
        res.status(201).json({ id: newStock.insertId, item_name, item_type, quantity, category_id, supplier_id }); // Send the created stock back with the ID
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get all stocks
router.get('/', async (req, res) => {
    try {
        const [stocks] = await pool.query(
            `SELECT s.*, c.name as category_name, p.name as supplier_name 
            FROM stocks s 
            JOIN categories c ON s.category_id = c.id 
            JOIN suppliers p ON s.supplier_id = p.id`
        );
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
        const [stock] = await pool.query(
            `SELECT s.*, c.name as category_name, p.name as supplier_name 
            FROM stocks s 
            JOIN categories c ON s.category_id = c.id 
            JOIN suppliers p ON s.supplier_id = p.id 
            WHERE s.id = ?`, 
            [id]
        );
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
    const { item_name, item_type, quantity, category_id, supplier_id } = req.body; // Use category_id and supplier_id
    try {
        await pool.query(
            'UPDATE stocks SET item_name = ?, item_type = ?, quantity = ?, category_id = ?, supplier_id = ? WHERE id = ?',
            [item_name, item_type, quantity, category_id, supplier_id, id]
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
