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
        <Box sx={{ p: 3, bgcolor: '#f9f9f9', borderRadius: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                View Stock
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

                            {user?.department === 'procurement' && <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: '#fff' }}>Actions</TableCell>} {/* Conditionally render Actions column */}
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
                {/* Conditionally render the buttons */}
                {user?.department === 'procurement' ? (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate(`/dashboard/edit-stock/${stock.id}`)}
                            sx={{ mr: 1 }} // Margin to the right
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
                    </>
                ) : (
                    <Typography variant="body2" color="textSecondary">No Actions Available</Typography>
                )}
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
