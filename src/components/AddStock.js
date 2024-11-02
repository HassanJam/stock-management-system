// src/components/AddStock.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, MenuItem, Snackbar, Alert, Typography } from '@mui/material';

const AddStock = () => {
    const [itemName, setItemName] = useState('');
    const [itemType, setItemType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [successMessage, setSuccessMessage] = useState(false); // New state for success message
    const categories = ['Camera', 'Wire', 'Landline Phone', 'Video Phone'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newStock = { itemName, itemType, quantity, category };

        try {
            await axios.post('http://localhost:5000/api/stocks', newStock);
            setItemName('');
            setItemType('');
            setQuantity('');
            setCategory('');
            setSuccessMessage(true); // Show success message
        } catch (error) {
            console.error('Error adding stock:', error);
            alert('Failed to add stock.');
        }
    };

    const handleCloseSnackbar = () => {
        setSuccessMessage(false); // Hide success message
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
                <TextField
                    fullWidth
                    select
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    margin="normal"
                    variant="outlined"
                >
                    <MenuItem value="">
                        <em>Select a category</em>
                    </MenuItem>
                    {categories.map((cat, index) => (
                        <MenuItem key={index} value={cat}>
                            {cat}
                        </MenuItem>
                    ))}
                </TextField>
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
            
            {/* Snackbar for success message */}
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
