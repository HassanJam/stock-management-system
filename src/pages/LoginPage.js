// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Container, Typography, TextField, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [department, setDepartment] = useState('procurement');
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setUser({ username, department });
        navigate('/dashboard');
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" gutterBottom align="center">
                Login
            </Typography>
            <Box component="form" onSubmit={handleLogin} display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <FormControl fullWidth>
                    <InputLabel>Department</InputLabel>
                    <Select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        label="Department"
                    >
                        <MenuItem value="procurement">Procurement</MenuItem>
                        <MenuItem value="sales">Sales</MenuItem>
                        {/* Add more departments as needed */}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </Box>
        </Container>
    );
};

export default LoginPage;
