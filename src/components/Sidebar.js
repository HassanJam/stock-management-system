import React from 'react';
import {  Drawer, List, ListItem, ListItemText, Divider, IconButton, Box, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';

const Sidebar = ({ department, isCollapsed, toggleSidebar }) => {
    const { user, setUser, setToken } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        navigate('/');
    };

    const sidebarOptions = {
        procurement: [
            { text: 'Dashboard', path: '/dashboard', icon: <HomeIcon /> },
            { text: 'Add Stock', path: '/dashboard/addStock', icon: <PostAddIcon /> },
            { text: 'View Stock', path: '/dashboard/viewStock', icon: <Inventory2Icon /> },
            { text: 'Add Supplier', path: '/dashboard/addSupplier', icon: <PersonAddIcon /> },
            { text: 'Requisition Form', path: '/dashboard/requisitionForm', icon: <AddBoxIcon /> },
            { text: 'Purchase Order', path: '/dashboard/purchaseOrders', icon: <AddBoxIcon /> }
        ],
        stock_manager: [
            { text: 'Dashboard', path: '/dashboard', icon: <HomeIcon /> },
            { text: 'Add Stock', path: '/dashboard/addStock', icon: <PostAddIcon /> },
            { text: 'View Stock', path: '/dashboard/viewStock', icon: <Inventory2Icon /> }
        ],
        sales: [
            { text: 'View Sales Stock', path: '/dashboard/viewStock', icon: <Inventory2Icon /> },
            { text: 'Requisition Form', path: '/dashboard/requisitionForm', icon: <AddBoxIcon /> },
            { text: 'Purchase orders', path: '/dashboard/purchaseOrders', icon: <AddBoxIcon /> }
        ]
    };

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: isCollapsed ? 60 : 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { 
                    width: isCollapsed ? 60 : 240,
                    boxSizing: 'border-box', 
                    background: '#92363E', // Background color of the sidebar
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional shadow for depth
                    flexDirection: 'column',
                }
            }}
        >

            {/* Logo Box with Black Background */}
            <Box sx={{ bgcolor: 'black', width: '100%', height: isCollapsed ? '64px' : '120px' , display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {!isCollapsed && (
                    <img
                        src="/logo.png" // Replace with the actual path to your logo image
                        alt="Logo"
                        style={{
                            height: '80px', // Adjust the height of the logo
                            width: 'auto',  // Maintains the aspect ratio
                        }}
                    />
                )}
                {/* Toggle Button */}
                <ListItem
                        sx={{
                            justifyContent: isCollapsed ? 'center' : 'flex-end',
                            cursor: 'pointer',
                            px: isCollapsed ? 0 : 2,
                        }}
                    >
                        <IconButton 
                            onClick={toggleSidebar}
                            style={{ color: "#92363E" }}
                            className={`p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 ${!isCollapsed ? "" : "mb-1" // Add bottom margin when sidebar is collapsed
                                }`}
                        >
                            {isCollapsed ? <ChevronRight sx={{ color: '#92363E' }} /> : <ChevronLeft sx={{ color: '#92363E' }} />}
                        </IconButton>
                </ListItem>
            </Box>

            {/* Divider */}
            <Divider sx={{ backgroundColor: '#FFF', marginY: 2, width: '100%', height: '1px', marginTop: 0, marginBottom: 0 }} />

            <List>

            {sidebarOptions[department].map((option, index) => (
                    <ListItem 
                        button 
                        key={index} 
                        component={Link} 
                        to={option.path}
                        selected={location.pathname === option.path}
                        sx={{
                            '&:hover': {
                                backgroundColor: '#92363E', // Light color on hover
                                '& .MuiTypography-root': {
                                    fontSize: '1.1rem', // Increase font size on hover
                                },
                            },
                        }}
                    >
                        
                        {/* Icon */}
                        {option.icon && (
                            <div style={{ marginRight: isCollapsed ? 0 : '16px', display: 'flex', alignItems: 'center', color: 'white' }}>
                                {option.icon}
                            </div>
                        )}

                        {/* Text */}
                        {!isCollapsed && (
                            <ListItemText
                                primary={option.text}
                                primaryTypographyProps={{
                                    sx: {
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                    },
                                }}
                            />
                        )}
                    </ListItem>
                ))}

                {/* Separator Line */}
                <Divider sx={{ backgroundColor: '#ddd', marginY: 2, marginX: 2 }} /> {/* Customize color and spacing */}

                    <>
                {/* Logout Button */}
                
                <ListItem 
                    button 
                    onClick={handleLogout}
                    sx={{
                        '&:hover': {
                            backgroundColor: '#92363E', // Light color on hover
                            '& .MuiTypography-root': {
                                fontSize: '1.1rem', // Increase font size on hover
                            },
                        },
                    }}
                >
                    <ExitToAppIcon sx={{ color: 'white', marginRight: 2 }} />
                        {/* Text */}
                        {!isCollapsed && (
                            <ListItemText
                                primary="Logout"
                                primaryTypographyProps={{
                                    sx: {
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                    },
                                }}
                            />
                        )}
                    </ListItem>
                </>
            </List>
            
            {/* User */}
            <Box sx={{ marginTop: 'auto' }}>
                <Divider sx={{ backgroundColor: '#ddd', marginY: 2 }} />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: isCollapsed ? 'center' : 'flex-start', // Center icon when collapsed
                        justifyContent: isCollapsed ? 'center' : 'flex-start', // Center icon when collapsed
                        padding: 2,
                        textAlign: isCollapsed ? 'center' : 'left', // Center text when collapsed
                    }}
                >
                    <AccountCircleRoundedIcon sx={{ color: 'white', fontSize: '50px' }} />
                    {!isCollapsed && (
                        <Typography
                            variant="body1"
                            sx={{
                                px: 1.5,
                                py: 0.5,
                                borderRadius: '5px',
                                color: '#fff',
                                fontWeight: 500,
                                fontSize: '1rem',
                                letterSpacing: 0.5,
                            }}
                        >
                            {user.username}
                        </Typography>
                    )}
                </Box>
            </Box>

        </Drawer>
    );
};

export default Sidebar;
