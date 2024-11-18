import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Button,
    TextField,
} from '@mui/material';
import api from '../api/api.js';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const { stocks_api } = api;

const ViewStock = () => {
    const [stocks, setStocks] = useState([]);
    const [filteredStocks, setFilteredStocks] = useState([]);
    const [filters, setFilters] = useState({ itemName: '', brand: '', supplier: '', serialNo: '', quality: '' });
    const navigate = useNavigate();
    const { user } = useUser();

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await axios.get(stocks_api);
                setStocks(response.data);
                setFilteredStocks(response.data);
            } catch (error) {
                console.error('Error fetching stocks:', error);
            }
        };

        fetchStocks();
    }, []);

    // Filter stocks whenever filters change
    useEffect(() => {
        const filtered = stocks.filter(stock => {
            return (
                (stock.itemName || '').toLowerCase().includes(filters.itemName.toLowerCase()) &&
                (stock.brand || '').toLowerCase().includes(filters.brand.toLowerCase()) &&
                (stock.supplierName || '').toLowerCase().includes(filters.supplier.toLowerCase()) &&
                (stock.serial_no || '').toLowerCase().includes(filters.serialNo.toLowerCase()) &&
                (stock.quality || '').toLowerCase().includes(filters.quality.toLowerCase())
            );
        });
        setFilteredStocks(filtered);
    }, [filters, stocks]);
    

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${stocks_api}/${id}`);
            setStocks(stocks.filter(stock => stock.id !== id));
            setFilteredStocks(filteredStocks.filter(stock => stock.id !== id));
        } catch (error) {
            console.error('Error deleting stock:', error);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const calculateTotalQuantity = () => {
        return filteredStocks.reduce((total, stock) => total + stock.quantity, 0);
    };

    return (
        <Box sx={{ p: 3, bgcolor: '#f9f9f9', borderRadius: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                View Stock
            </Typography>
            
            {/* Filter Inputs */}
            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <TextField
                    label="Item Name"
                    variant="outlined"
                    name="itemName"
                    value={filters.itemName}
                    onChange={handleFilterChange}
                />
                <TextField
                    label="Brand"
                    variant="outlined"
                    name="brand"
                    value={filters.brand}
                    onChange={handleFilterChange}
                />
                <TextField
                    label="Supplier"
                    variant="outlined"
                    name="supplier"
                    value={filters.supplier}
                    onChange={handleFilterChange}
                />
                <TextField
                    label="Serial No."
                    variant="outlined"
                    name="serialNo"
                    value={filters.serialNo}
                    onChange={handleFilterChange}
                />
                <TextField
                    label="Quality"
                    variant="outlined"
                    name="quality"
                    value={filters.quality}
                    onChange={handleFilterChange}
                />
            </Box>

            {/* Display Total Quantity */}
            <Typography variant="h6" align="left" sx={{ mb: 2 }}>
                Total Quantity: {calculateTotalQuantity()}
            </Typography>

            <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: '#fff' }}>Item Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: '#fff' }}>Brand</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: '#fff' }}>Quantity</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: '#fff' }}>Unit</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: '#fff' }}>Cost</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: '#fff' }}>Serial No.</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: '#fff' }}>Quality</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: '#fff' }}>Supplier</TableCell>
                            {user?.department === 'procurement' && (
                                <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: '#fff' }}>Actions</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredStocks.map((stock) => (
                            <TableRow key={stock.id}>
                                <TableCell>{stock.itemName}</TableCell>
                                <TableCell>{stock.itemName}</TableCell>
                                <TableCell>{stock.brand}</TableCell>
                                <TableCell>{stock.quantity}</TableCell>
                                <TableCell>{stock.unit}</TableCell>
                                <TableCell>{stock.cost}</TableCell>
                                <TableCell>{stock.serialNo}</TableCell>
                                <TableCell>{stock.serialNo}</TableCell>
                                <TableCell>{stock.quality}</TableCell>
                                <TableCell>{stock.supplierName}</TableCell>
                                <TableCell>{stock.supplierName}</TableCell>
                                {user?.department === 'procurement' ? (
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => navigate(`/dashboard/editStock/${stock.id}`)}
                                            sx={{ mr: 1 }}
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
                                    </TableCell>
                                ) : (
                                    <TableCell>
                                        <Typography variant="body2" color="textSecondary">
                                            No Actions Available
                                        </Typography>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ViewStock;
