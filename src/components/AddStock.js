import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, MenuItem, Snackbar, Alert, Typography, FormControl, InputLabel, Select } from '@mui/material';
import api from '../api/api.js';

const { stocks_api, suppliers_api } = api; // Import APIs, including suppliers API

const AddStock = () => {
    const [itemName, setItemName] = useState('');
    const [brand, setBrand] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [cost, setCost] = useState('');
    const [serialNo, setSerialNo] = useState('');
    const [quality, setQuality] = useState(''); // Changed to an empty string for Select
    const [supplier, setSupplier] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        // Fetch suppliers from the API
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get(suppliers_api);
                setSuppliers(response.data);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
                alert('Failed to load suppliers.');
            }
        };

        fetchSuppliers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newStock = {
            item_name: itemName,
            brand,
            quantity,
            unit,
            cost,
            serial_no: serialNo,
            quality,
            supplier_id: supplier,
        };

        try {
            await axios.post(stocks_api, newStock);
            // Reset form fields
            setItemName('');
            setBrand('');
            setQuantity('');
            setUnit('');
            setCost('');
            setSerialNo('');
            setQuality(''); // Reset quality to empty
            setSupplier('');
            setSuccessMessage(true);
        } catch (error) {
            console.error('Error adding stock:', error);
            alert('Failed to add stock.');
        }
    };

    const handleCloseSnackbar = () => {
        setSuccessMessage(false);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Add Stock
            </Typography>
            <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
                <TextField
                    fullWidth
                    label="Item Name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    required
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    margin="normal"
                    variant="outlined"
                />
                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Unit</InputLabel>
                    <Select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        required
                    >
                        <MenuItem value="">
                            <em>Select unit</em>
                        </MenuItem>
                        <MenuItem value="Pcs">Pieces</MenuItem>
                        <MenuItem value="Kg">Kilograms</MenuItem>
                        <MenuItem value="Liters">Liters</MenuItem>
                        <MenuItem value="Meters">Meters</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    label="Cost Per Unit"
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    required
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="Serial Number"
                    value={serialNo}
                    onChange={(e) => setSerialNo(e.target.value)}
                    margin="normal"
                    variant="outlined"
                />
                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Quality</InputLabel>
                    <Select
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                        required
                    >
                        <MenuItem value="">
                            <em>Select quality</em>
                        </MenuItem>
                        <MenuItem value="New">New</MenuItem>
                        <MenuItem value="Used">Used</MenuItem>
                        <MenuItem value="Refurbished">Refurbished</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Supplier</InputLabel>
                    <Select
                        value={supplier}
                        onChange={(e) => setSupplier(e.target.value)}
                        required
                    >
                        <MenuItem value="">
                            <em>Select a supplier</em>
                        </MenuItem>
                        {suppliers.map((sup) => (
                            <MenuItem key={sup.id} value={sup.id}>
                                {sup.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ mt: 2 }}
                >
                    Add Stock
                </Button>
            </form>

            <Snackbar
                open={successMessage}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
                    Stock added successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddStock;
