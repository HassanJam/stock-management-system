// /frontend/src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Container, Typography, TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { login } from '../services/authService';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('procurement');
    const { setUser, setToken } = useUser();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Logging in with', { username, password, department }); // Log input details
    
        try {
            const response = await login(username, password);
            console.log('Login response:', response.data); // Log response data
            const { token, department } = response.data;
            setToken(token);
            setUser({ username, department });
            localStorage.setItem('token', token); // Store token in local storage
            navigate('/dashboard'); // Redirect to dashboard
        } catch (error) {
            console.error('Login failed:', error); // Log error
            alert('Login failed. Check your credentials.');
        }
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
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
