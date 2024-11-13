import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Snackbar, Alert, Typography, Card, CardContent, Grid, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import api from '../api/api.js';

const { po_api } = api; 

const AddPurchaseOrder = () => {
    const [client, setClient] = useState('');
    const [tax, setTax] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [other, setOther] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState([{ itemName: '', quantity: 0, unitPrice: 0, totalPrice: 0 }]);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        if (field === 'quantity' || field === 'unitPrice') {
            updatedItems[index].totalPrice = updatedItems[index].quantity * updatedItems[index].unitPrice;
        }
        setItems(updatedItems);
        calculateSubtotal(updatedItems);
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
        const newTotal = newSubtotal + parseFloat(taxValue) + parseFloat(shippingValue) + parseFloat(otherValue);
        setTotal(newTotal);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPO = {
            client,
            userId: 1, // Replace with dynamic user ID if available
            status: 'pending', // Default status
            tax,
            shipping,
            other,
            subtotal,
            total,
            items: items.map(({ itemName, quantity, unitPrice, totalPrice }) => ({
                item_name: itemName,
                quantity,
                unit_price: unitPrice,
                total_price: totalPrice,
            })),
        };

        try {
            console.log(newPO);

            await axios.post(po_api, newPO);

            // Reset form fields
            setClient('');
            setTax(0);
            setShipping(0);
            setOther(0);
            setSubtotal(0);
            setTotal(0);
            setItems([{ itemName: '', quantity: 0, unitPrice: 0, totalPrice: 0 }]);
            setSuccessMessage(true);
        } catch (error) {
            console.error('Error adding PO:', error);
            setErrorMessage('Failed to add PO.');
        }
    };

    const handleCloseSnackbar = () => {
        setSuccessMessage(false);
        setErrorMessage('');
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Add Purchase Order
            </Typography>
            <Card variant="outlined" sx={{ maxWidth: 700, margin: '0 auto', boxShadow: 3, borderRadius: 2, bgcolor: '#f5f5f5' }}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
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
                                    onChange={(e) => {
                                        setTax(parseFloat(e.target.value));
                                        calculateTotal(subtotal, e.target.value, shipping, other);
                                    }}
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
                                    onChange={(e) => {
                                        setShipping(parseFloat(e.target.value));
                                        calculateTotal(subtotal, tax, e.target.value, other);
                                    }}
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
                                    onChange={(e) => {
                                        setOther(parseFloat(e.target.value));
                                        calculateTotal(subtotal, tax, shipping, e.target.value);
                                    }}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Subtotal"
                                    value={subtotal.toFixed(2)}
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Total"
                                    value={total.toFixed(2)}
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
                                        value={item.totalPrice.toFixed(2)}
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
                            Submit PO
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
                    PO added successfully!
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

export default AddPurchaseOrder;
