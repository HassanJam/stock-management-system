// src/components/ViewStock.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography, Select, MenuItem, FormControl, InputLabel, Card, CardContent, Button, Box } from '@mui/material';
import stocks_api from '../api/api.js'

const ViewStock = () => {
    const [stocks, setStocks] = useState([]);
    const [filter, setFilter] = useState('');
    const categories = ['Camera', 'Wire', 'Landline Phone', 'Video Phone'];

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await axios.get(`${stocks_api}`);
                setStocks(response.data);
            } catch (error) {
                console.error("Failed to fetch stocks.", error);
            }
        };

        fetchStocks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${stocks_api}/${id}`);
            setStocks(stocks.filter(stock => stock.id !== id));
        } catch (error) {
            console.error("Failed to delete stock.", error);
        }
    };

    const filteredStocks = filter ? stocks.filter(stock => stock.category === filter) : stocks;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                View Stocks
            </Typography>
            <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                <InputLabel>Filter by Category</InputLabel>
                <Select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    label="Filter by Category"
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    {categories.map((cat, index) => (
                        <MenuItem key={index} value={cat}>
                            {cat}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {filteredStocks.length === 0 ? (
                <Typography variant="body1" align="center">
                    No stocks available.
                </Typography>
            ) : (
                <Box display="flex" flexDirection="column" gap={2}>
                    {filteredStocks.map((stock) => (
                        <Card key={stock.id} variant="outlined">
                            <CardContent>
                                <Typography variant="h6">
                                    {stock.itemName} - {stock.itemType}
                                </Typography>
                                <Typography variant="body2">
                                    Category: {stock.category} - Quantity: {stock.quantity}
                                </Typography>
                                <Box mt={2} display="flex" justifyContent="space-between">
                                <Button
                                        variant="contained"
                                        color="primary"
                                        component={Link}
                                        to={`/dashboard/edit-stock/${stock.id}`} // This line should be correct
                                    >
                                        Edit
                                </Button>

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(stock.id)}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default ViewStock;
