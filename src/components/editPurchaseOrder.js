import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box, MenuItem, FormControl, InputLabel, Select, Snackbar, Alert, Card, CardContent } from '@mui/material';
import api from '../api/api.js';

const { po_api, suppliers_api } = api;

const EditPurchaseOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [orderName, setOrderName] = useState('');
    const [supplier, setSupplier] = useState('');
    const [quantity, setQuantity] = useState('');
    const [status, setStatus] = useState('');
    const [cost, setCost] = useState('');
    const [suppliers, setSuppliers] = useState([]);
    const [successMessage, setSuccessMessage] = useState(false);

    useEffect(() => {
        const fetchPurchaseOrder = async () => {
            try {
                const response = await axios.get(`${po_api}/${id}`);
                const poData = response.data;
                setOrderName(poData.order_name);
                setSupplier(poData.supplier_id);
                setQuantity(poData.quantity);
                setStatus(poData.status);
                setCost(poData.cost);
            } catch (error) {
                console.error("Failed to fetch purchase order.", error);
            }
        };

        const fetchSuppliers = async () => {
            try {
                const response = await axios.get(suppliers_api);
                setSuppliers(response.data);
            } catch (error) {
                console.error("Failed to fetch suppliers.", error);
            }
        };

        fetchPurchaseOrder();
        fetchSuppliers();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedPO = {
            order_name: orderName,
            supplier_id: supplier,
            quantity,
            status,
            cost,
        };

        try {
            await axios.put(`${po_api}/${id}`, updatedPO);
            setSuccessMessage(true);
            setTimeout(() => {
                navigate('/dashboard/purchase-orders');
            }, 2000);
        } catch (error) {
            console.error("Failed to update purchase order.", error.response ? error.response.data : error);
            alert('Failed to update purchase order.');
        }
    };

    const handleCloseSnackbar = () => {
        setSuccessMessage(false);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Edit Purchase form
            </Typography>
            <Card variant="outlined" sx={{ maxWidth: 500, margin: '0 auto', boxShadow: 3, borderRadius: 2, bgcolor: '#f5f5f5' }}>
                <CardContent>
                    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
                        <TextField
                            fullWidth
                            label="Order Name"
                            value={orderName}
                            onChange={(e) => setOrderName(e.target.value)}
                            required
                            margin="normal"
                            variant="outlined"
                        />
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
                        <TextField
                            fullWidth
                            label="Cost"
                            type="number"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            required
                            margin="normal"
                            variant="outlined"
                        />
                        <FormControl fullWidth margin="normal" variant="outlined">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                required
                            >
                                <MenuItem value="">
                                    <em>Select status</em>
                                </MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Approved">Approved</MenuItem>
                                <MenuItem value="Rejected">Rejected</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{ mt: 2 }}
                        >
                            Update Purchase Order
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Snackbar
                open={successMessage}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
                    Purchase order updated successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default EditPurchaseOrder;
