import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel, Button, Box, Typography, Paper, Grid, Container } from '@mui/material';
import axios from 'axios';
import api from '../api/api'; // Import your API file
const { stocks_api } = api;

const AddStock = () => {
    const [itemDescription, setItemDescription] = useState('');
    const [modelNumber, setModelNumber] = useState('');
    const [serialNumbers, setSerialNumbers] = useState(['']);
    const [make, setMake] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [type, setType] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [stockInDate, setStockInDate] = useState('');
    const [stockInDetails, setStockInDetails] = useState('');
    const [stockOutDate, setStockOutDate] = useState('');
    const [stockOutDetails, setStockOutDetails] = useState('');
    const [inwardGatePass, setInwardGatePass] = useState(null);
    const [outwardGatePass, setOutwardGatePass] = useState(null);
    const [storeLocation, setStoreLocation] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [stockStatus, setStockStatus] = useState('');

    const handleSerialNumberChange = (index, value) => {
        const updatedSerialNumbers = [...serialNumbers];
        updatedSerialNumbers[index] = value;
        setSerialNumbers(updatedSerialNumbers);
    };

    const addSerialField = () => setSerialNumbers([...serialNumbers, '']);
    const removeSerialField = (index) => {
        const updatedSerialNumbers = serialNumbers.filter((_, i) => i !== index);
        setSerialNumbers(updatedSerialNumbers);
    };

    const handleFileUpload = (e, setFile) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('itemDescription', itemDescription);
        formData.append('modelNumber', modelNumber);
        serialNumbers.forEach((serial, index) => formData.append(`serialNumbers[${index}]`, serial));
        formData.append('make', make);
        formData.append('quantity', quantity);
        formData.append('unit', unit);
        formData.append('type', type);
        formData.append('purchaseDate', purchaseDate);
        formData.append('stockInDate', stockInDate);
        formData.append('stockInDetails', stockInDetails);
        formData.append('stockOutDate', stockOutDate);
        formData.append('stockOutDetails', stockOutDetails);
        formData.append('inwardGatePass', inwardGatePass);
        formData.append('outwardGatePass', outwardGatePass);
        formData.append('storeLocation', storeLocation);
        formData.append('contactPerson', contactPerson);
        formData.append('stockStatus', stockStatus);

        try {
            await axios.post(stocks_api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Stock added successfully!');
        } catch (error) {
            console.error('Error adding stock:', error);
            alert('Failed to add stock.');
        }
    };

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Stock Status</InputLabel>
                                <Select value={stockStatus} onChange={(e) => setStockStatus(e.target.value)} fullWidth>
                                    <MenuItem value="In">In</MenuItem>
                                    <MenuItem value="Out">Out</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Item Description"
                                value={itemDescription}
                                onChange={(e) => setItemDescription(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true, // Prevent label from floating
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Model Number"
                                value={modelNumber}
                                onChange={(e) => setModelNumber(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true, // Prevent label from floating
                                }}
                            />
                        </Grid>
                        {serialNumbers.map((serial, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <Box display="flex" alignItems="center" marginY={1}>
                                    <TextField
                                        label={`Serial Number ${index + 1}`}
                                        value={serial}
                                        onChange={(e) => handleSerialNumberChange(index, e.target.value)}
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true, // Prevent label from floating
                                        }}
                                    />
                                    <Button onClick={() => removeSerialField(index)} color="error" sx={{ ml: 1, backgroundColor: '#000000', color: '#FFFFFF' }}>
                                        Remove
                                    </Button>
                                </Box>
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <Button onClick={addSerialField} variant="outlined" sx={{ mb: 2, backgroundColor: '#000000', color: '#FFFFFF' }}>
                                Add Serial Number
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Make"
                                value={make}
                                onChange={(e) => setMake(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true, // Prevent label from floating
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                type="number"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true, // Prevent label from floating
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Unit of Measurement"
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true, // Prevent label from floating
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Type</InputLabel>
                                <Select value={type} onChange={(e) => setType(e.target.value)} fullWidth>
                                    <MenuItem value="New">New</MenuItem>
                                    <MenuItem value="Used">Used</MenuItem>
                                    <MenuItem value="Refurbished">Refurbished</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Purchase Date"
                                value={purchaseDate}
                                onChange={(e) => setPurchaseDate(e.target.value)}
                                type="date"
                                InputLabelProps={{
                                    shrink: true, // Prevent label from floating
                                }}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Stock-In Date & Time"
                                value={stockInDate}
                                onChange={(e) => setStockInDate(e.target.value)}
                                type="datetime-local"
                                InputLabelProps={{
                                    shrink: true, // Prevent label from floating
                                }}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Stock-In Person Details"
                                value={stockInDetails}
                                onChange={(e) => setStockInDetails(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true, // Prevent label from floating
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Stock-Out Date & Time"
                                value={stockOutDate}
                                onChange={(e) => setStockOutDate(e.target.value)}
                                type="datetime-local"
                                InputLabelProps={{
                                    shrink: true, // Prevent label from floating
                                }}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Stock-Out Person Details"
                                value={stockOutDetails}
                                onChange={(e) => setStockOutDetails(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true, // Prevent label from floating
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <input
                                type="file"
                                onChange={(e) => handleFileUpload(e, setInwardGatePass)}
                                style={{ padding: '10px' }}
                            />
                            <Typography variant="caption" color="textSecondary">
                                Inward Gate Pass
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <input
                                type="file"
                                onChange={(e) => handleFileUpload(e, setOutwardGatePass)}
                                style={{ padding: '10px' }}
                            />
                            <Typography variant="caption" color="textSecondary">
                                Outward Gate Pass
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Store Location</InputLabel>
                                <Select value={storeLocation} onChange={(e) => setStoreLocation(e.target.value)} fullWidth>
                                    <MenuItem value="Lahore">Lahore</MenuItem>
                                    <MenuItem value="Islamabad">Islamabad</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Contact Person"
                                value={contactPerson}
                                onChange={(e) => setContactPerson(e.target.value)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true, // Prevent label from floating
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3 }}>
                        <Button type="submit" variant="contained" sx={{ backgroundColor: '#000000' }} fullWidth>
                            Add Stock
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default AddStock;
