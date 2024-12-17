import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box, MenuItem, FormControl, InputLabel, Select, Snackbar, Alert, Card, CardContent } from '@mui/material';
import api from '../api/api.js';

const { requisitionApi } = api;

const EditRequisitionForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [projectName, setProjectName] = useState('');
    const [clientName, setClientName] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);

    useEffect(() => {
        const fetchRequisitionForm = async () => {
            try {
                const response = await axios.get(`${requisitionApi}/${id}`);
                const reqData = response.data;
                console.log(reqData);
                const formattedDate = reqData.date ? reqData.date.split('T')[0] : '';
                console.log(formattedDate)

                console.log(reqData);
                setProjectName(reqData.projectName);
                setClientName(reqData.clientName);
                setDate(formattedDate);
                setDescription(reqData.description);
                setStatus(reqData.status);
            } catch (error) {
                console.error("Failed to fetch requisition form.", error);
            }
        };

        fetchRequisitionForm();
    }, [id]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedRequisition = {
            projectName,
            clientName,
            date,
            description,
            status,
        };

        try {
            await axios.put(`${requisitionApi}/${id}`, updatedRequisition);
            setSuccessMessage(true);
            setTimeout(() => {
                navigate('/dashboard/requisitionForm');
            }, 2000);
        } catch (error) {
            console.error("Failed to update requisition form.", error.response ? error.response.data : error);
            alert('Failed to update requisition form.');
        }
    };

    const handleCloseSnackbar = () => {
        setSuccessMessage(false);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Edit Requisition Form
            </Typography>
            <Card variant="outlined" sx={{ maxWidth: 500, margin: '0 auto', boxShadow: 3, borderRadius: 2, bgcolor: '#f5f5f5' }}>
                <CardContent>
                    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
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
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="completed">Completed</MenuItem>
                                <MenuItem value="rejected">Rejected</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{ mt: 2, mb: 3, backgroundColor: '#000000' }}
                        >
                            Update Requisition Form
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
                    Requisition form updated successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default EditRequisitionForm;
