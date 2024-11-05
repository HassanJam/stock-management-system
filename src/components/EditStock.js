import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box, MenuItem, FormControl, InputLabel, Select, Snackbar, Alert } from '@mui/material';
import api from '../api/api.js';

const { stocks_api, suppliers_api, categories_api } = api; // Ensure you import correct APIs

const EditStock = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [itemName, setItemName] = useState('');
    const [brand, setBrand] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [cost, setCost] = useState('');
    const [serialNo, setSerialNo] = useState('');
    const [quality, setQuality] = useState('');
    const [supplier, setSupplier] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const response = await axios.get(`${stocks_api}/${id}`);
                const stockData = response.data;
                setItemName(stockData.item_name);
                setBrand(stockData.brand);
                setQuantity(stockData.quantity);
                setUnit(stockData.unit);
                setCost(stockData.cost);
                setSerialNo(stockData.serial_no);
                setQuality(stockData.quality);
                setSupplier(stockData.supplier_id);
            } catch (error) {
                console.error("Failed to fetch stock.", error);
            }
        };

        const fetchSuppliers = async () => {
            try {
                const response = await axios.get(suppliers_api);
                setSuppliers(response.data);
            } catch (error) {
                console.error("Failed to fetch suppliers.", error);
            }
        };

        fetchStock();
        fetchSuppliers();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedStock = {
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
            await axios.put(`${stocks_api}/${id}`, updatedStock);
            setSuccessMessage(true);
            // Optionally, navigate after a delay
            setTimeout(() => {
                navigate('/dashboard/view-stock');
            }, 2000);
        } catch (error) {
            console.error("Failed to update stock.", error.response ? error.response.data : error);
            alert('Failed to update stock.');
        }
    };

    const handleCloseSnackbar = () => {
        setSuccessMessage(false);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Edit Stock
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
                        <MenuItem value="pcs">Pieces</MenuItem>
                        <MenuItem value="kg">Kilograms</MenuItem>
                        <MenuItem value="liters">Liters</MenuItem>
                        <MenuItem value="m">Meters</MenuItem>
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
                        <MenuItem value="new">New</MenuItem>
                        <MenuItem value="used">Used</MenuItem>
                        <MenuItem value="refurbished">Refurbished</MenuItem>
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
                    Update Stock
                </Button>
            </form>

            <Snackbar
                open={successMessage}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
                    Stock updated successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default EditStock;
