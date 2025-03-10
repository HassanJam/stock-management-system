import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Container, Typography, TextField, Button, Box, Paper, Snackbar, Alert } from '@mui/material';
import { login } from '../services/authService';
import Header from '../components/Header'; 

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser, setToken } = useUser();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            const { token, department } = response.data;
            setToken(token);
            setUser({ username, department });
            localStorage.setItem('token', token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Check your credentials.');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div style={{ 
            background: 'linear-gradient(to bottom right, #e3f2fd, #bbdefb)', // Match gradient background from Dashboard
            minHeight: '100vh' 
        }}>
            <Header />
            <Container 
                maxWidth="xs" 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    minHeight: 'calc(100vh - 64px)', // Adjust for the height of the header
                }}
            >
                <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, bgcolor: '#f9f9f9', width: '100%' }}>
                    <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1976d2' }}>
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
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                    </Box>
                </Paper>
            </Container>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default LoginPage;
