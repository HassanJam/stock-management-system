import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Container, Typography, TextField, Button, Box, Paper, Snackbar, Alert } from '@mui/material';
import { login } from '../services/authService';
import Header from '../components/Header'; 
import { useNavbar } from '../context/NavbarContext';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser, setToken } = useUser();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { setNavbarTitle } = useNavbar();
                        
    useEffect(() => {
        setNavbarTitle("");
        }, [setNavbarTitle]);

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
            background: `url('/loginbg.jpg') no-repeat center center`,
            backgroundSize: 'cover',
            minHeight: '100vh',
            margin: 0,                // Removes default margin
            padding: 0,               // Removes default padding
            position: 'absolute',      // Positions the div relative to the body
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',            // Makes sure the div takes the full width
            height: '100%',            // Makes sure the div takes the full height
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
                    <Typography variant="h4" gutterBottom align="center" sx={{ color: '#000000' }}>
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
                        <Button type="submit" variant="contained" sx= {{ backgroundColor: '#92363E' }} fullWidth>
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
