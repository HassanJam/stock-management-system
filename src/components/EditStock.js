// src/components/EditStock.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import stocks_api from '../api/api.js'

const EditStock = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [stock, setStock] = useState({ itemName: '', itemType: '', quantity: '', category: '' });
    const categories = ['Camera', 'Wire', 'Landline Phone', 'Video Phone'];

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const response = await axios.get(`${stocks_api}/${id}`);
                setStock({
                    itemName: response.data.itemName || '',
                    itemType: response.data.itemType || '',
                    quantity: response.data.quantity || '',
                    category: response.data.category || '',
                });
            } catch (error) {
                console.error("Failed to fetch stock.", error);
            }
        };
    
        fetchStock();
    }, [id]);

    const handleChange = (e) => {
        setStock({ ...stock, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${stocks_api}/${id}`, stock);
            navigate('/dashboard/view-stock');
        } catch (error) {
            console.error("Failed to update stock.", error.response ? error.response.data : error);
        }
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
                    name="itemName"
                    value={stock.itemName}
                    onChange={handleChange}
                    required
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="Item Type"
                    name="itemType"
                    value={stock.itemType}
                    onChange={handleChange}
                    required
                    margin="normal"
                    variant="outlined"
                />
                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Category</InputLabel>
                    <Select
                        name="category"
                        value={stock.category}
                        onChange={handleChange}
                        label="Category"
                        required
                    >
                        <MenuItem value="">
                            <em>Select a category</em>
                        </MenuItem>
                        {categories.map((cat, index) => (
                            <MenuItem key={index} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={stock.quantity}
                    onChange={handleChange}
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
                    Update Stock
                </Button>
            </form>
        </Box>
    );
};

export default EditStock;
