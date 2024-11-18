import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Snackbar, Alert, Typography, Card, CardContent } from '@mui/material';
import dayjs from 'dayjs';
import api from '../api/api.js';

const { requisitionApi } = api; // Ensure this points to the correct API endpoint

const AddRequisitionForm = () => {
    const [projectName, setProjectName] = useState('');
    const [clientName, setClientName] = useState('');
    const [date, setDate] = useState(dayjs().format('YYYY-MM-DDTHH:mm')); // Default to current date-time
    const [projectDescription, setProjectDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const formatDateForUI = (isoDate) => dayjs(isoDate).format('DD MMM YYYY'); // Format: 13 Nov 2024

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = formatDateForUI(date);
        const newRequisition = {
            projectName,
            clientName,
            date: formattedDate,
            projectDescription,
        };

        try {
            await axios.post(requisitionApi, newRequisition);
            // Reset form fields
            setProjectName('');
            setClientName('');
            setDate(dayjs().format('YYYY-MM-DDTHH:mm'));
            setProjectDescription('');
            setSuccessMessage(true);
        } catch (error) {
            console.error('Error adding requisition form:', error);
            setErrorMessage('Failed to add requisition form.');
        }
    };

    const handleCloseSnackbar = () => {
        setSuccessMessage(false);
        setErrorMessage('');
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Add Requisition Form
            </Typography>
            <Card
                variant="outlined"
                sx={{
                    maxWidth: 600,
                    margin: '0 auto',
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: '#f5f5f5',
                }}
            >
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Project Name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Client Name"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            required
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Date"
                            type="datetime-local"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            margin="normal"
                            variant="outlined"
                            helperText={`Formatted Date: ${formatDateForUI(date)}`}
                        />
                        <TextField
                            fullWidth
                            label="Project Description"
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                            required
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows={4}
                        />
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
                            Submit Requisition Form
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
                    Requisition form added successfully!
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

export default AddRequisitionForm;
