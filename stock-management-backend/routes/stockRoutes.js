const express = require('express');
const router = express.Router();
const pool = require('../db'); // Import the database connection pool
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
router.post('/', upload.fields([{ name: 'inwardGatePass' }, { name: 'outwardGatePass' }]), async (req, res) => {
    // Destructure the request body data
    const {
        itemDescription,
        modelNumber,
        serialNumbers,
        make, // Represents the company name
        quantity,
        unit,
        type,
        purchaseDate,
        stockInDate,
        stockInDetails,
        stockOutDate,
        stockOutDetails,
        storeLocation,
        contactPerson,
        stockStatus // The new field for stock status
    } = req.body;

    // Log incoming data for debugging
    console.log('Incoming request data:', req.body);
    console.log('Request files:', req.files);

    // Check for missing fields
    if (!itemDescription || !modelNumber || !make || !quantity || !unit || !type || !purchaseDate || !stockStatus) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();
        const stockOutDateValue = stockOutDate === '' ? null : stockOutDate;
        const stockOutDetailsValue = stockOutDetails === '' ? null : stockOutDetails;
        const [stockResult] = await connection.query(
            `INSERT INTO stocks (
                item_description, model_number, make, quantity, unit_of_measurement, type, 
                purchase_date, stock_in_date, stock_in_details, stock_out_date, 
                stock_out_details, store_location, contact_person, stock_status
             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
            [
                itemDescription, modelNumber, make, quantity, unit, type,
                purchaseDate, stockInDate, stockInDetails, stockOutDateValue,
                stockOutDetailsValue, storeLocation, contactPerson, stockStatus
            ]
        );

        const stockId = stockResult.insertId;

        // Insert serial numbers if provided
        if (serialNumbers && serialNumbers.length > 0) {
            const serialNumberValues = serialNumbers.map(sn => [stockId, sn]);
            await connection.query(
                `INSERT INTO serial_numbers (stock_id, serial_number) VALUES ?`,
                [serialNumberValues]
            );
        }

        // Insert files if provided
        if (req.files && req.files.inwardGatePass && req.files.outwardGatePass) {
            const fileValues = [
                [stockId, 'inwardGatePass', req.files.inwardGatePass[0].path],
                [stockId, 'outwardGatePass', req.files.outwardGatePass[0].path]
            ];
            await connection.query(
                `INSERT INTO files (stock_id, file_type, file_path) VALUES ?`,
                [fileValues]
            );
        }

        await connection.commit();

        res.status(201).json({ id: stockId, message: 'Stock item created successfully' });
    } catch (err) {
        await connection.rollback();
        console.error(err);
        res.status(500).send('Server Error');
    } finally {
        connection.release();
    }
});

// Get all stock items
router.get('/', async (req, res) => {
    try {
        const [stocks] = await pool.query(
            `SELECT stocks.id, stocks.item_description, stocks.model_number, stocks.make, 
                    stocks.quantity, stocks.unit_of_measurement, stocks.type, stocks.purchase_date, 
                    stocks.stock_in_date, stocks.stock_out_date, stocks.store_location, 
                    stocks.contact_person, GROUP_CONCAT(serial_numbers.serial_number) AS serial_numbers
             FROM stocks
             LEFT JOIN serial_numbers ON stocks.id = serial_numbers.stock_id
             GROUP BY stocks.id`
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
            `SELECT stocks.*, GROUP_CONCAT(serial_numbers.serial_number) AS serial_numbers
             FROM stocks
             LEFT JOIN serial_numbers ON stocks.id = serial_numbers.stock_id
             WHERE stocks.id = ?
             GROUP BY stocks.id`,
            [id]
        );

        if (stock.length === 0) {
            return res.status(404).json({ message: 'Stock item not found' });
        }

        const [files] = await pool.query(
            `SELECT file_type, file_path FROM files WHERE stock_id = ?`,
            [id]
        );

        res.json({ ...stock[0], files });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update the stock item
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {
        itemDescription,
        modelNumber,
        make,
        quantity,
        unitOfMeasurement,
        type,
        purchaseDate,
        stockInDate,
        stockInDetails,
        stockOutDate,
        stockOutDetails,
        storeLocation,
        contactPerson,
        stockStatus, // The new stock status field
        serialNumbers,
        files
    } = req.body;

    const connection = await pool.getConnection();

    try {
        // Begin transaction
        await connection.beginTransaction();

        // Update stocks table
        const [result] = await connection.query(
            `UPDATE stocks
             SET item_description = ?, model_number = ?, make = ?, quantity = ?, 
                 unit_of_measurement = ?, type = ?, purchase_date = ?, stock_in_date = ?, 
                 stock_in_details = ?, stock_out_date = ?, stock_out_details = ?, 
                 store_location = ?, contact_person = ?, stock_status = ?
             WHERE id = ?`,
            [
                itemDescription, modelNumber, make, quantity, unitOfMeasurement, type,
                purchaseDate, stockInDate, stockInDetails, stockOutDate,
                stockOutDetails, storeLocation, contactPerson, stockStatus, id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Stock item not found' });
        }

        // Update serial numbers
        await connection.query(`DELETE FROM serial_numbers WHERE stock_id = ?`, [id]);
        if (serialNumbers && serialNumbers.length > 0) {
            const serialNumberValues = serialNumbers.map(sn => [id, sn]);
            await connection.query(
                `INSERT INTO serial_numbers (stock_id, serial_number) VALUES ?`,
                [serialNumberValues]
            );
        }

        // Update files
        await connection.query(`DELETE FROM files WHERE stock_id = ?`, [id]);
        if (files && files.length > 0) {
            const fileValues = files.map(file => [id, file.fileType, file.filePath]);
            await connection.query(
                `INSERT INTO files (stock_id, file_type, file_path) VALUES ?`,
                [fileValues]
            );
        }

        // Commit transaction
        await connection.commit();

        res.json({ message: 'Stock item updated successfully' });
    } catch (err) {
        // Rollback transaction on error
        await connection.rollback();
        console.error(err);
        res.status(500).send('Server Error');
    } finally {
        // Release the connection
        connection.release();
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
