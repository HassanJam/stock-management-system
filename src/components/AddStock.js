import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, MenuItem, Snackbar, Alert, Typography, FormControl, InputLabel, Select } from '@mui/material';
import api from '../api/api.js'

const { stocks_api } = api; // Import APIs

const AddStock = () => {
    const [itemName, setItemName] = useState('');
    const [itemType, setItemType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [supplier, setSupplier] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        // Dummy categories data
        const dummyCategories = [
            { id: 1, name: 'Electronics' },
            { id: 2, name: 'Furniture' },
            { id: 3, name: 'Clothing' },
            { id: 4, name: 'Books' },
            { id: 5, name: 'Toys' },
            { id: 6, name: 'Groceries' },
            { id: 7, name: 'Stationery' },
        ];

        // Dummy suppliers data
        const dummySuppliers = [
            { id: 1, name: 'Supplier A' },
            { id: 2, name: 'Supplier B' },
            { id: 3, name: 'Supplier C' },
            { id: 4, name: 'Supplier D' },
            { id: 5, name: 'Supplier E' },
        ];

        // Set dummy data to state
        setCategories(dummyCategories);
        setSuppliers(dummySuppliers);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newStock = {
            item_name: itemName, // Update key to match database column
            item_type: itemType, // Update key to match database column
            quantity,
            category_id: category,
            supplier_id: supplier
        };
    
        try {
            await axios.post(stocks_api, newStock);
            setItemName('');
            setItemType('');
            setQuantity('');
            setCategory('');
            setSupplier('');
            setSuccessMessage(true);
        } catch (error) {
            console.error('Error adding stock:', error);
            alert('Failed to add stock frontend.');
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
                    label="Item Type"
                    value={itemType}
                    onChange={(e) => setItemType(e.target.value)}
                    required
                    margin="normal"
                    variant="outlined"
                />
                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <MenuItem value="">
                            <em>Select a category</em>
                        </MenuItem>
                        {categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </MenuItem>
                        ))}
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
