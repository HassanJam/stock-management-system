import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useUser } from '../context/UserContext';
import { useNavbar } from '../context/NavbarContext';

const Header = ({ isSidebarCollapsed }) => {
    const { user } = useUser();
    const { navbarTitle } = useNavbar();

    const location = useLocation(); // Get the current location

    // Only render the Header if the current page is not '/login'
    if (location.pathname === '/') {
        return (
            <AppBar 
            position="fixed" 
            sx={{   
                    backgroundColor: '#00000000', 
                    boxShadow: 'none', 
                    width: '100%',
                    transition: 'width 0.3s ease',
                }}
        >

            <Toolbar 
                sx={{ 
                        height: '64px', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center' 
                    }}
            >
                {/* Logo Section */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src="/logo.png" // Replace with the actual path to your logo image
                        alt="Logo"
                        style={{
                            paddingTop: '40px',
                            height: '80px', // Adjust the height of the logo
                            width: 'auto',  // Maintains the aspect ratio
                        }}
                    />
                </Box>

            </Toolbar>
        </AppBar>
        )
    }

    return (
        <AppBar 
            position="fixed" 
            sx={{   
                    backgroundColor: '#000000', 
                    boxShadow: 'none', 
                    zIndex: theme => theme.zIndex.drawer + 1,
                    width: isSidebarCollapsed ? 'calc(100% - 60px)' : 'calc(100% - 240px)',
                    transition: 'width 0.3s ease',
                }}
        >

            <Toolbar 
                sx={{ 
                        height: '64px', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center' 
                    }}
            >

                <Typography 
                    variant="h5" 
                    sx={{   
                            fontWeight: 600, 
                            letterSpacing: 1, 
                            textAlign: 'center', 
                            color: '#FFFFFF' 
                        }}
                >

                {navbarTitle} {/* Display the navbar title from context */}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
