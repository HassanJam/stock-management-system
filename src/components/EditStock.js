import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import api from '../api/api.js';

const { stocks_api, suppliers_api, categories_api } = api; // Ensure you import correct APIs

const EditStock = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [stock, setStock] = useState({ item_name: '', item_type: '', quantity: '', category_id: '', supplier_id: '' });
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
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
        const fetchStock = async () => {
            try {
                const response = await axios.get(`${stocks_api}/${id}`);
                console.log("Fetched Stock:", response.data); // Debug log
                setStock(response.data);
            } catch (error) {
                console.error("Failed to fetch stock.", error);
            }
        };
        

        const fetchCategories = async () => {
            try {
                const response = await axios.get(categories_api);
                console.log("Fetched Categories:", response.data); // Debug log
                setCategories(response.data);
            } catch (error) {
                console.error("Failed to fetch categories.", error);
            }
        };
        
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get(suppliers_api);
                console.log("Fetched Suppliers:", response.data); // Debug log
                setSuppliers(response.data);
            } catch (error) {
                console.error("Failed to fetch suppliers.", error);
            }
        };
        

        fetchStock();
        fetchCategories();
        fetchSuppliers();
        // Set dummy data to state
        setCategories(dummyCategories);
        setSuppliers(dummySuppliers);
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
                    name="item_name"
                    value={stock.item_name}
                    onChange={handleChange}
                    required
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="Item Type"
                    name="item_type"
                    value={stock.item_type}
                    onChange={handleChange}
                    required
                    margin="normal"
                    variant="outlined"
                />
                <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Category</InputLabel>
                    <Select
                        name="category_id"
                        value={stock.category_id}
                        onChange={handleChange}
                        label="Category"
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
                        name="supplier_id"
                        value={stock.supplier_id}
                        onChange={handleChange}
                        label="Supplier"
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
