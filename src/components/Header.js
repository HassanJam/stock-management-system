import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useUser } from '../context/UserContext';
import { useNavbar } from '../context/NavbarContext';

const Header = () => {
    const { user } = useUser();
    const { navbarTitle } = useNavbar();

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#000000', boxShadow: 'none', zIndex: 1100 }}>
            <Toolbar sx={{ height: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 600, letterSpacing: 1, textAlign: 'center', color: '#FFFFFF' }}>
                    {navbarTitle} {/* Display the navbar title from context */}
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
                                backgroundColor: '#92363E',
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
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
