const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import the database connection pool

// Create a new purchase order with items
router.post('/', async (req, res) => {
    console.log("New PO added", req.body);
    const { client, userId, status, tax, shipping, other, subtotal, total, items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Items are required for a purchase order.' });
    }

    // Get a connection from the pool
    const connection = await pool.getConnection();
    try {
        // Start a transaction
        await connection.beginTransaction();

        // Step 1: Insert the purchase order
        const [purchaseOrderResult] = await connection.query(
            `INSERT INTO purchaseOrders (client, userId, status, tax, shipping, other, subtotal, total) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [client, userId, status, tax, shipping, other, subtotal, total]
        );
        console.log("PO added in backend");
        const purchaseOrderId = purchaseOrderResult.insertId;
        console.log("PO ID", purchaseOrderId);

        // Step 2: Insert each item associated with the purchase order

        console.log("Items", items);
        const itemValues = items.map(item => [
            purchaseOrderId,
            item.itemName,
            item.quantity,
            item.unitPrice,
            item.quantity * item.unitPrice // Calculate totalPrice for each item
        ]);
        console.log("Item values", itemValues[0]);

        await connection.query(
            `INSERT INTO purchaseOrderItems (purchaseOrderId, itemName, quantity, unitPrice, totalPrice) 
             VALUES ?`,
            [itemValues]
        );

        // Commit the transaction
        await connection.commit();
        res.status(201).json({ id: purchaseOrderId, message: 'Purchase order with items created successfully' });
    } catch (error) {
        // Roll back the transaction in case of error
        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    } finally {
        // Release the connection back to the pool
        connection.release();
    }
});

// Add an item to a specific purchase order
router.post('/:id/items', async (req, res) => {
    const { id: purchaseOrderId } = req.params;
    const { itemName, quantity, unitPrice, totalPrice } = req.body;

    try {
        const [result] = await pool.query(
            `INSERT INTO purchaseOrderItems (purchaseOrderId, itemName, quantity, unitPrice, totalPrice)
             VALUES (?, ?, ?, ?, ?)`,
            [purchaseOrderId, itemName, quantity, unitPrice, totalPrice]
        );
        res.status(201).json({ id: result.insertId, message: 'Item added to purchase order successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get all purchase orders with their items
router.get('/', async (req, res) => {
    try {
        const [purchaseOrders] = await pool.query(`SELECT * FROM purchaseOrders`);
        const [items] = await pool.query(`SELECT * FROM purchaseOrderItems`);

        // Group items by purchase order ID
        const ordersWithItems = purchaseOrders.map(order => ({
            ...order,
            items: items.filter(item => item.purchaseOrderId === order.id),
        }));

        res.json(ordersWithItems);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get a specific purchase order by ID with its items
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [purchaseOrder] = await pool.query(`SELECT * FROM purchaseOrders WHERE id = ?`, [id]);
        if (purchaseOrder.length === 0) {
            return res.status(404).json({ message: 'Purchase order not found' });
        }

        const [items] = await pool.query(`SELECT * FROM purchaseOrderItems WHERE purchaseOrderId = ?`, [id]);

        res.json({ ...purchaseOrder[0], items });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update purchase order with all fields
router.put('/:id', async (req, res) => {
    console.log("PO edited", req.body);

    const { id } = req.params;
    const { client, userId, status, tax, shipping, other, subtotal, total, items } = req.body;

    // Convert tax, shipping, other, subtotal, and total to numbers
    const parsedTax = parseFloat(tax);
    const parsedShipping = parseFloat(shipping);
    const parsedOther = parseFloat(other);
    const parsedSubtotal = parseFloat(subtotal);
    const parsedTotal = parseFloat(total);

    // Ensure the required fields are provided and are valid numbers
    if (!client || !userId || isNaN(parsedTax) || isNaN(parsedShipping) || isNaN(parsedOther) || isNaN(parsedSubtotal) || isNaN(parsedTotal) || !status || !items || items.length === 0) {
        return res.status(400).json({ message: 'All fields are required and must have valid values.' });
    }

    try {
        // Update the purchase order table with the main details
        const [result] = await pool.query(
            `UPDATE purchaseOrders 
             SET client = ?, userId = ?, tax = ?, shipping = ?, other = ?, subtotal = ?, total = ?, status = ?
             WHERE id = ?`,
            [client, userId, parsedTax, parsedShipping, parsedOther, parsedSubtotal, parsedTotal, status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Purchase order not found' });
        }

        // Now update the items in the 'purchaseOrderItems' table
        // First, delete existing items associated with this order
        await pool.query('DELETE FROM purchaseOrderItems WHERE purchaseOrderId = ?', [id]);

        // Insert new items
        const itemPromises = items.map(item => {
            const { itemName, quantity, unitPrice, totalPrice } = item;
            return pool.query(
                `INSERT INTO purchaseOrderItems (purchaseOrderId, itemName, quantity, unitPrice, totalPrice) 
                 VALUES (?, ?, ?, ?, ?)`,
                [id, itemName, quantity, unitPrice, totalPrice]
            );
        });

        // Wait for all item insertions to complete
        await Promise.all(itemPromises);

        // Respond with success
        res.json({ message: 'Purchase order updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete a purchase order and its associated items
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM purchaseOrderItems WHERE purchaseOrderId = ?', [id]);
        const [result] = await pool.query('DELETE FROM purchaseOrders WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Purchase order not found' });
        }
        res.json({ message: 'Purchase order deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
