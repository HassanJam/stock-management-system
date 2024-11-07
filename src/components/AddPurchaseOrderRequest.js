// src/components/AddPurchaseOrderRequest.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Snackbar, Alert, Typography, Card, CardContent } from '@mui/material';
import api from '../api/api.js';

const { po_request_api } = api; // Assume `po_request_api` is the API endpoint for PO requests

const AddPurchaseOrderRequest = () => {
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPORequest = {
            item_name: itemName,
            quantity: parseInt(quantity, 10),
            user_id: 1 // Replace with dynamic user ID if available
        };

        try {
            await axios.post(po_request_api, newPORequest);
            // Reset form fields
            setItemName('');
            setQuantity('');
            setSuccessMessage(true);
        } catch (error) {
            console.error('Error adding PO request:', error);
            setErrorMessage('Failed to add PO request.');
        }
    };

    const handleCloseSnackbar = () => {
        setSuccessMessage(false);
        setErrorMessage('');
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Add Purchase Order Request
            </Typography>
            <Card variant="outlined" sx={{ maxWidth: 500, margin: '0 auto', boxShadow: 3, borderRadius: 2, bgcolor: '#f5f5f5' }}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Item Name"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            required
                            margin="normal"
                            variant="outlined"
                        />
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
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{
                                mt: 2,
                                bgcolor: '#1976d2',
                                '&:hover': {
                                    bgcolor: '#115293', // Darker blue on hover
                                },
                            }}
                        >
                            Add PO Request
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
                    PO request added successfully!
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

export default AddPurchaseOrderRequest;
