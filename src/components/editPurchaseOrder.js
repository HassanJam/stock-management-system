import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import { TextField, Button, Box, Snackbar, Alert, Typography, Card, CardContent, Grid, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import api from '../api/api.js';

const { poApi } = api;

const EditPurchaseOrder = ({ orderId }) => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState('');
    const [tax, setTax] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [other, setOther] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState([{ itemName: '', quantity: 0, unitPrice: 0, totalPrice: 0 }]);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [status, setStatus] = useState('pending'); // Default to 'pending'

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await axios.get(`${poApi}/${id}`);
                const poData = response.data;
                setClient(poData.client);
                setTax(poData.tax);
                setShipping(poData.shipping);
                setOther(poData.other);
                setSubtotal(poData.subtotal);
                setTotal(poData.total);
                setItems(poData.items.map(item => ({
                    itemName: item.itemName,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    totalPrice: item.totalPrice,
                })));
                setStatus(poData.status); // Set the status
            } catch (error) {
                setErrorMessage('Failed to load purchase order.');
            }
        };

        fetchOrderData();
    }, [orderId]);

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        if (field === 'quantity' || field === 'unitPrice') {
            updatedItems[index][field] = parseFloat(value) || 0; // Ensure it's a number
            updatedItems[index].totalPrice = updatedItems[index].quantity * updatedItems[index].unitPrice;
        } else {
            updatedItems[index][field] = value; // For non-numeric fields like itemName
        }
        setItems(updatedItems);

        // Recalculate subtotal and total
        const newSubtotal = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);
        setSubtotal(newSubtotal);
        calculateTotal(newSubtotal, tax, shipping, other);
    };


    const handleTaxChange = (value) => {
        const parsedValue = parseFloat(value) || 0;
        setTax(parsedValue);
        calculateTotal(subtotal, parsedValue, shipping, other);
    };

    const handleShippingChange = (value) => {
        const parsedValue = parseFloat(value) || 0;
        setShipping(parsedValue);
        calculateTotal(subtotal, tax, parsedValue, other);
    };

    const handleOtherChange = (value) => {
        const parsedValue = parseFloat(value) || 0;
        setOther(parsedValue);
        calculateTotal(subtotal, tax, shipping, parsedValue);
    };

    const addItem = () => {
        setItems([...items, { itemName: '', quantity: 0, unitPrice: 0, totalPrice: 0 }]);
    };

    const removeItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
        calculateSubtotal(updatedItems);
    };

    const calculateSubtotal = (updatedItems) => {
        const newSubtotal = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);
        setSubtotal(newSubtotal);
        calculateTotal(newSubtotal, tax, shipping, other);
    };

    const calculateTotal = (newSubtotal, taxValue, shippingValue, otherValue) => {
        console.log("Data types:");
        console.log("newSubtotal:", newSubtotal, typeof newSubtotal);
        console.log("taxValue:", taxValue, typeof taxValue);
        console.log("shippingValue:", shippingValue, typeof shippingValue);
        console.log("otherValue:", otherValue, typeof otherValue);

        const newTotal = parseFloat(newSubtotal || 0) + parseFloat(taxValue || 0) + parseFloat(shippingValue || 0) + parseFloat(otherValue || 0);
        setTotal(newTotal);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedPO = {
            client,
            userId: 1, // Replace with dynamic user ID if available
            status, // Include the status
            tax,
            shipping,
            other,
            subtotal,
            total,
            items: items.map(({ itemName, quantity, unitPrice, totalPrice }) => ({
                itemName: itemName,
                quantity,
                unitPrice: unitPrice,
                totalPrice: totalPrice,
            })),
        };
    
        try {
            await axios.put(`${poApi}/${id}`, updatedPO);
            setSuccessMessage(true);
            setTimeout(() => {
                navigate('/dashboard/purchaseOrders');
            }, 1000);
        } catch (error) {
            console.error('Error updating PO:', error);
            setErrorMessage('Failed to update PO.');
        }
    };
    

    const handleCloseSnackbar = () => {
        setSuccessMessage(false);
        setErrorMessage('');
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Edit Purchase Order
            </Typography>
            <Card variant="outlined" sx={{ maxWidth: 700, margin: '0 auto', boxShadow: 3, borderRadius: 2, bgcolor: '#f5f5f5' }}>
                <CardContent>
                    <form onSubmit={handleSubmit}>

                        <FormControl fullWidth margin="normal" variant="outlined">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)} // Update status state
                                label="Status"
                            >
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="approved">Approved</MenuItem>
                                <MenuItem value="rejected">Rejected</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Client"
                            value={client}
                            onChange={(e) => setClient(e.target.value)}
                            required
                            margin="normal"
                            variant="outlined"
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Tax"
                                    type="number"
                                    value={tax}
                                    onChange={(e) => handleTaxChange(e.target.value)}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Shipping"
                                    type="number"
                                    value={shipping}
                                    onChange={(e) => handleShippingChange(e.target.value)}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Other Charges"
                                    type="number"
                                    value={other}
                                    onChange={(e) => handleOtherChange(e.target.value)}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Subtotal"
                                    value={subtotal}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Total"
                                    value={total}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                        </Grid>
                        <Typography variant="h6" sx={{ mt: 3 }}>
                            Items
                        </Typography>
                        {items.map((item, index) => (
                            <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 2 }}>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        label="Item Name"
                                        value={item.itemName}
                                        onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        fullWidth
                                        label="Quantity"
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value, 10))}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        fullWidth
                                        label="Unit Price"
                                        type="number"
                                        value={item.unitPrice}
                                        onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        fullWidth
                                        label="Total Price"
                                        value={item.totalPrice}
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton onClick={() => removeItem(index)} color="error">
                                        <Delete />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        ))}
                        <Button
                            startIcon={<Add />}
                            onClick={addItem}
                            sx={{ mt: 2 }}
                            variant="outlined"
                            color="primary"
                        >
                            Add Item
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{
                                mt: 3,
                                bgcolor: '#1976d2',
                                '&:hover': {
                                    bgcolor: '#115293',
                                },
                            }}
                        >
                            Update PO
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
                    PO updated successfully!
                </Alert>
            </Snackbar>
            <Snackbar
                open={!!errorMessage}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" variant="filled">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default EditPurchaseOrder;
