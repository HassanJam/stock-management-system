import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Snackbar, Alert, Typography, Card, CardContent } from '@mui/material';
import api from '../api/api.js';

const { suppliers_api } = api; // Import suppliers API

const AddSupplier = () => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSupplier = {
            name,
            contact,
            email,
        };

        try {
            await axios.post(suppliers_api, newSupplier);
            // Reset form fields
            setName('');
            setContact('');
            setEmail('');
            setSuccessMessage(true);
        } catch (error) {
            console.error('Error adding supplier:', error);
            alert('Failed to add supplier.');
        }
    };

    const handleCloseSnackbar = () => {
        setSuccessMessage(false);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Add Supplier
            </Typography>
            <Card variant="outlined" sx={{ maxWidth: 500, margin: '0 auto', boxShadow: 3, borderRadius: 2, bgcolor: '#f5f5f5' }}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Supplier Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Contact"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            Add Supplier
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
                    Supplier added successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddSupplier;
