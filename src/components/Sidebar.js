import React from 'react';
import {  Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ department }) => {
    const { setUser, setToken } = useUser();
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
            { text: 'Dashboard', path: '/dashboard' },
            { text: 'Add Stock', path: '/dashboard/addStock' },
            { text: 'View Stock', path: '/dashboard/viewStock' },
            { text: 'Add Supplier', path: '/dashboard/addSupplier' },
            { text: 'Requisition Form', path: '/dashboard/requisitionForm' },
            { text: 'Purchase Order', path: '/dashboard/purchaseOrders' }
        ],
        stock_manager: [
            { text: 'Dashboard', path: '/dashboard' },
            { text: 'Add Stock', path: '/dashboard/addStock' },
            { text: 'View Stock', path: '/dashboard/viewStock' },
        ],
        sales: [
            { text: 'View Sales Stock', path: '/dashboard/viewStock' },
            { text: 'Requisition Form', path: '/dashboard/requisitionForm' },
            { text: 'Purchase orders', path: '/dashboard/purchaseOrders' }

        ]
    };

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { 
                    width: 240, 
                    boxSizing: 'border-box', 
                    marginTop: '64px',
                    background: '#92363E', // Background color of the sidebar
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Optional shadow for depth
                }
            }}
        >
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
                        <ListItemText 
                            primary={option.text} 
                            primaryTypographyProps={{
                                sx: {
                                    color: 'white', 
                                    fontWeight: 'bold',
                                    fontSize: '1rem', // Default font size
                                }
                            }}
                        />
                    </ListItem>
                ))}

                {/* Separator Line */}
                <Divider sx={{ backgroundColor: '#ddd', marginY: 2 }} /> {/* Customize color and spacing */}

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
                    <ListItemText 
                        primary="Logout" 
                        primaryTypographyProps={{
                            sx: { 
                                color: 'white', 
                                fontWeight: 'bold' 
                            }
                        }}
                    />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
