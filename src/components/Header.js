import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Header = () => {
    const { user, setUser, setToken } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#3f51b5', boxShadow: 'none', zIndex: 1100 }}>
            <Toolbar sx={{ height: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 600, letterSpacing: 1, textAlign: 'center' }}>
                    Inventory Management
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {user && (
                        <Typography
                            variant="body1"
                            sx={{
                                mr: 2,
                                px: 1.5,
                                py: 0.5,
                                borderRadius: '5px',
                                color: '#fff',
                                backgroundColor: '#5c6bc0',
                                fontWeight: 500,
                                fontSize: '1rem',
                                letterSpacing: 0.5,
                                textAlign: 'center',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                            }}
                        >
                            {user.username}
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLogout}
                        sx={{
                            ml: 2,
                            color: '#fff',
                            backgroundColor: '#f50057',
                            height: '40px',
                            fontWeight: 600,
                            textTransform: 'none',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                            '&:hover': {
                                backgroundColor: '#c51162',
                            },
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
