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
    Modal,
    Menu,
    MenuItem,
} from '@mui/material';
import api from '../api/api.js';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const { stocks_api } = api;

const ViewStock = () => {
    const [stocks, setStocks] = useState([]);
    const [filteredStocks, setFilteredStocks] = useState([]);
    const [filters, setFilters] = useState({
        itemDescription: '',
        modelNumber: '',
        storeLocation: '',
        type: '',
    });

    const [selectedSerials, setSelectedSerials] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedStockId, setSelectedStockId] = useState(null);

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

    // Filter stocks dynamically when filters change
    useEffect(() => {
        const filtered = stocks.filter((stock) => {
            return (
                (stock.item_description || '').toLowerCase().includes(filters.itemDescription.toLowerCase()) &&
                (stock.model_number || '').toLowerCase().includes(filters.modelNumber.toLowerCase()) &&
                (stock.store_location || '').toLowerCase().includes(filters.storeLocation.toLowerCase()) &&
                (stock.type || '').toLowerCase().includes(filters.type.toLowerCase())
            );
        });
        setFilteredStocks(filtered);
    }, [filters, stocks]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${stocks_api}/${id}`);
            setStocks(stocks.filter((stock) => stock.id !== id));
            setFilteredStocks(filteredStocks.filter((stock) => stock.id !== id));
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

    const openModal = (serials) => {
        setSelectedSerials(serials.split(','));
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    const calculateTotalQuantity = () => {
        return filteredStocks.reduce((total, stock) => total + stock.quantity, 0);
    };

    // Handle dropdown menu open
    const handleClick = (event, stockId) => {
        setAnchorEl(event.currentTarget);
        setSelectedStockId(stockId);
    };

    // Handle dropdown menu close
    const handleClose = () => {
        setAnchorEl(null);
        setSelectedStockId(null);
    };

    return (
        <Box sx={{ p: 3, bgcolor: '#f9f9f9', borderRadius: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                View Stock
            </Typography>

            {/* Filters */}
            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <TextField
                    label="Item Description"
                    variant="outlined"
                    name="itemDescription"
                    value={filters.itemDescription}
                    onChange={handleFilterChange}
                />
                <TextField
                    label="Model Number"
                    variant="outlined"
                    name="modelNumber"
                    value={filters.modelNumber}
                    onChange={handleFilterChange}
                />
                <TextField
                    label="Store Location"
                    variant="outlined"
                    name="storeLocation"
                    value={filters.storeLocation}
                    onChange={handleFilterChange}
                />
                <TextField
                    label="Type"
                    variant="outlined"
                    name="type"
                    value={filters.type}
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
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: '#fff' }}>Item Description</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: '#fff' }}>Model Number</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: '#fff' }}>Quantity</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: '#fff' }}>Unit</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: '#fff' }}>Type</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: '#fff' }}>Store Location</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: '#fff' }}>Serial Numbers</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', bgcolor: '#1976d2', color: '#fff' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredStocks.map((stock) => (
                            <TableRow key={stock.id}>
                                <TableCell>{stock.item_description}</TableCell>
                                <TableCell>{stock.model_number}</TableCell>
                                <TableCell>{stock.quantity}</TableCell>
                                <TableCell>{stock.unit_of_measurement}</TableCell>
                                <TableCell>{stock.type}</TableCell>
                                <TableCell>{stock.store_location}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="text"
                                        color="primary"
                                        onClick={() => openModal(stock.serial_numbers)}
                                    >
                                        View Available Serial Numbers
                                    </Button>
                                </TableCell>

                                <TableCell>
                                    {user?.department === 'procurement' && (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={(event) => handleClick(event, stock.id)}
                                                sx={{ mr: 1 }}
                                            >
                                                Actions
                                            </Button>

                                            {/* Dropdown Menu */}
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl) && selectedStockId === stock.id}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'actions-button',
                                                }}
                                                PaperProps={{
                                                    sx: {
                                                        boxShadow: 3,
                                                        borderRadius: 1,
                                                    },
                                                }}
                                            >
                                                <MenuItem
                                                    onClick={() => {
                                                        navigate(`/dashboard/editStock/${stock.id}`);
                                                        handleClose();
                                                    }}
                                                >
                                                    Edit
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        handleDelete(stock.id);
                                                        handleClose();
                                                    }}
                                                >
                                                    Delete
                                                </MenuItem>
                                            </Menu>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal for Serial Numbers */}
            <Modal open={modalOpen} onClose={closeModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: 2,
                        boxShadow: 5,
                        p: 4,
                        maxWidth: 450,
                        width: '100%',
                        outline: 'none',
                    }}
                >
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            color: '#1976d2',
                            textAlign: 'center',
                            mb: 2,
                        }}
                    >
                        Serial Numbers
                    </Typography>
                    <Box sx={{ maxHeight: 300, overflowY: 'auto', mb: 2 }}>
                        <ul style={{ listStyleType: 'decimal', paddingLeft: 20 }}>
                            {selectedSerials.map((serial, index) => (
                                <li key={index} style={{ paddingBottom: '5px' }}>
                                    <Typography variant="body2">{serial}</Typography>
                                </li>
                            ))}
                        </ul>
                    </Box>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={closeModal}
                        sx={{ display: 'block', margin: '0 auto' }}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default ViewStock;
