import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    MenuItem,
    Typography,
    FormControl,
    InputLabel,
    Select,
    Card,
    CardContent,
} from '@mui/material';
import axios from 'axios';
import api from '../api/api'; // Import your API file
const { stocks_api } = api; // Ensure this points to the correct API endpoint

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
        formData.forEach((value, key) => {
            console.log(key, value);  // Log each field name and value
        });
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
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Add Stock
            </Typography>
            <Card variant="outlined" sx={{ maxWidth: 600, margin: '0 auto', p: 2 }}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Item Description"
                            value={itemDescription}
                            onChange={(e) => setItemDescription(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Model Number"
                            value={modelNumber}
                            onChange={(e) => setModelNumber(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        {serialNumbers.map((serial, index) => (
                            <Box key={index} display="flex" alignItems="center" marginY={1}>
                                <TextField
                                    label={`Serial Number ${index + 1}`}
                                    value={serial}
                                    onChange={(e) => handleSerialNumberChange(index, e.target.value)}
                                    fullWidth
                                />
                                <Button
                                    onClick={() => removeSerialField(index)}
                                    color="error"
                                    sx={{ ml: 1 }}
                                >
                                    Remove
                                </Button>
                            </Box>
                        ))}
                        <Button onClick={addSerialField} variant="outlined" color="primary" sx={{ mb: 2 }}>
                            Add Serial Number
                        </Button>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Make</InputLabel>
                            <Select value={make} onChange={(e) => setMake(e.target.value)}>
                                <MenuItem value="In">In</MenuItem>
                                <MenuItem value="Out">Out</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            type="number"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Unit of Measurement"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Type</InputLabel>
                            <Select value={type} onChange={(e) => setType(e.target.value)}>
                                <MenuItem value="New">New</MenuItem>
                                <MenuItem value="Used">Used</MenuItem>
                                <MenuItem value="Refurbished">Refurbished</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Purchase Date"
                            value={purchaseDate}
                            onChange={(e) => setPurchaseDate(e.target.value)}
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Stock-In Date & Time"
                            value={stockInDate}
                            onChange={(e) => setStockInDate(e.target.value)}
                            type="datetime-local"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Stock-In Person Details"
                            value={stockInDetails}
                            onChange={(e) => setStockInDetails(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Stock-Out Date & Time"
                            value={stockOutDate}
                            onChange={(e) => setStockOutDate(e.target.value)}
                            type="datetime-local"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Stock-Out Person Details"
                            value={stockOutDetails}
                            onChange={(e) => setStockOutDetails(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <Typography>Inward Gate Pass/Delivery Challan</Typography>
                        <input type="file" onChange={(e) => handleFileUpload(e, setInwardGatePass)} />
                        <Typography>Outward Gate Pass/Delivery Challan</Typography>
                        <input type="file" onChange={(e) => handleFileUpload(e, setOutwardGatePass)} />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Store Location</InputLabel>
                            <Select value={storeLocation} onChange={(e) => setStoreLocation(e.target.value)}>
                                <MenuItem value="Lahore">Lahore</MenuItem>
                                <MenuItem value="Islamabad">Islamabad</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="For Project/Contact Person"
                            value={contactPerson}
                            onChange={(e) => setContactPerson(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Submit
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AddStock;
