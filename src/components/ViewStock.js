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
    const [filteredStocks, setFilteredStocks] = useState([]); // For displaying filtered stocks
    const [filters, setFilters] = useState({ itemName: '', brand: '', supplier: '', serialNo: '', quality: '' }); // Define filters
    const navigate = useNavigate();
    const { user } = useUser();

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await axios.get(stocks_api);
                setStocks(response.data);
                setFilteredStocks(response.data); // Initialize filtered stocks with all stocks
            } catch (error) {
                console.error('Error fetching stocks:', error);
            }
        };

        fetchStocks();
    }, []);

    // Update filtered stocks whenever filters change
    useEffect(() => {
        const filtered = stocks.filter(stock => {
            return (
                stock.item_name.toLowerCase().includes(filters.itemName.toLowerCase()) &&
                stock.brand.toLowerCase().includes(filters.brand.toLowerCase()) &&
                stock.supplier_name.toLowerCase().includes(filters.supplier.toLowerCase()) &&
                stock.serial_no.toLowerCase().includes(filters.serialNo.toLowerCase()) &&
                stock.quality.toLowerCase().includes(filters.quality.toLowerCase())
            );
        });
        setFilteredStocks(filtered);
    }, [filters, stocks]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${stocks_api}/${id}`);
            setStocks(stocks.filter(stock => stock.id !== id));
            setFilteredStocks(filteredStocks.filter(stock => stock.id !== id)); // Update filtered stocks as well
        } catch (error) {
            console.error('Error deleting stock:', error);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // Function to calculate total quantity of filtered stocks
    const calculateTotalQuantity = () => {
        return filteredStocks.reduce((total, stock) => total + stock.quantity, 0);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                View Stock
            </Typography>

            {/* Filter Inputs */}
            <Box sx={{ mb: 3 }}>
                <TextField
                    label="Item Name"
                    variant="outlined"
                    name="itemName"
                    value={filters.itemName}
                    onChange={handleFilterChange}
                    sx={{ mr: 2 }}
                />
                <TextField
                    label="Brand"
                    variant="outlined"
                    name="brand"
                    value={filters.brand}
                    onChange={handleFilterChange}
                    sx={{ mr: 2 }}
                />
                <TextField
                    label="Serial No."
                    variant="outlined"
                    name="serialNo"
                    value={filters.serialNo}
                    onChange={handleFilterChange}
                    sx={{ mr: 2 }}
                />
                <TextField
                    label="Quality"
                    variant="outlined"
                    name="quality"
                    value={filters.quality}
                    onChange={handleFilterChange}
                    sx={{ mr: 2 }}
                />
                <TextField
                    label="Supplier"
                    variant="outlined"
                    name="supplier"
                    value={filters.supplier}
                    onChange={handleFilterChange}
                    sx={{ mr: 2 }}
                />
            </Box>

            {/* Total Quantity Display */}
            <Typography variant="h6" align="center" gutterBottom>
                Total Quantity: {calculateTotalQuantity()}
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Brand</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Unit</TableCell>
                            <TableCell>Cost Per Unit</TableCell>
                            <TableCell>Serial No.</TableCell>
                            <TableCell>Quality</TableCell>
                            <TableCell>Supplier</TableCell>
                            {user?.department === 'procurement' && <TableCell>Actions</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredStocks.map((stock) => (
                            <TableRow key={stock.id}>
                                <TableCell>{stock.item_name}</TableCell>
                                <TableCell>{stock.brand}</TableCell>
                                <TableCell>{stock.quantity}</TableCell>
                                <TableCell>{stock.unit}</TableCell>
                                <TableCell>{stock.cost}</TableCell>
                                <TableCell>{stock.serial_no}</TableCell>
                                <TableCell>{stock.quality}</TableCell>
                                <TableCell>{stock.supplier_name}</TableCell>
                                {user?.department === 'procurement' && (
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => navigate(`/dashboard/edit-stock/${stock.id}`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleDelete(stock.id)}
                                            sx={{ ml: 1 }}
                                        >
                                            Delete
                                        </Button>
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
