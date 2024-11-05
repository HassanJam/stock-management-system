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
            minHeight: '100vh', 
            background: 'linear-gradient(to bottom right, #e3f2fd, #bbdefb)', // Example gradient background
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Header title="Login Page" showLoginButton={false} />
            <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Paper elevation={5} sx={{ padding: 4, width: '100%', maxWidth: 400, borderRadius: 3 }}>
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
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#1976d2', // Outline color
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#2196f3', // Hover outline color
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#0d47a1', // Focus outline color
                                    },
                                },
                            }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#1976d2', // Outline color
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#2196f3', // Hover outline color
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#0d47a1', // Focus outline color
                                    },
                                },
                            }}
                        />
                        <Button 
                            type="submit" 
                            variant="contained" 
                            sx={{
                                backgroundColor: '#1976d2',
                                '&:hover': {
                                    backgroundColor: '#1565c0',
                                },
                                fontWeight: 600,
                                height: '48px',
                                textTransform: 'none',
                            }} 
                            fullWidth
                        >
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
