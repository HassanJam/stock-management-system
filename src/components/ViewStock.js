// src/components/ViewStock.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button } from '@mui/material';
import api from '../api/api.js';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const { stocks_api } = api;

const ViewStock = () => {
    const user = useUser();
    const [stocks, setStocks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await axios.get(stocks_api);
                setStocks(response.data);
            } catch (error) {
                console.error('Error fetching stocks:', error);
            }
        };

        fetchStocks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${stocks_api}/${id}`);
            setStocks(stocks.filter(stock => stock.id !== id)); // Remove the deleted stock from the state
        } catch (error) {
            console.error('Error deleting stock:', error);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                View Stock
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Brand</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Unit</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell>Serial No.</TableCell>
                            <TableCell>Quality</TableCell>
                            <TableCell>Supplier</TableCell>
                            {user?.department === 'procurement' && <TableCell>Actions</TableCell>} {/* Conditionally render Actions column */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stocks.map((stock) => (
                            <TableRow key={stock.id}>
                                <TableCell>{stock.item_name}</TableCell>
                                <TableCell>{stock.brand}</TableCell>
                                <TableCell>{stock.quantity}</TableCell>
                                <TableCell>{stock.unit}</TableCell>
                                <TableCell>{stock.cost}</TableCell>
                                <TableCell>{stock.serial_no}</TableCell>
                                <TableCell>{stock.quality}</TableCell>
                                <TableCell>{stock.supplier_name}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate(`/dashboard/edit-stock/${stock.id}`)} // Navigate to edit page
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(stock.id)} // Handle deletion
                                        sx={{ ml: 1 }} // Add some margin to the left
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ViewStock;
