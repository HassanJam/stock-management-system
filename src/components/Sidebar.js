import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ department }) => {
    const location = useLocation();

    const sidebarOptions = {
        procurement: [
            { text: 'Dashboard', path: '/dashboard' },
            { text: 'Add Stock', path: '/dashboard/add-stock' },
            { text: 'View Stock', path: '/dashboard/view-stock' },
            { text: 'Add Supplier', path: '/dashboard/add-supplier' },
            { text: 'Purchase Order', path: '/dashboard/purchase-order' }
        ],
        stock_manager: [
            { text: 'Dashboard', path: '/dashboard' },
            { text: 'Add Stock', path: '/dashboard/add-stock' },
            { text: 'View Stock', path: '/dashboard/view-stock' },
            { text: 'Add Supplier', path: '/dashboard/add-supplier' },
        ],
        sales: [
            { text: 'View Sales Stock', path: '/dashboard/view-stock' },
            { text: 'Purchase Order', path: '/dashboard/purchase-order' }

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
                    background: '#ffffff', // Background color of the sidebar
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
                            '&.Mui-selected': {
                                backgroundColor: '#5c6bc0', // Change background color when selected
                                '&:hover': {
                                    backgroundColor: '#5c6bc0', // Keep selected background color on hover
                                },
                            },
                            '&:hover': {
                                backgroundColor: '#7e99d0', // Light color on hover
                            },
                        }}
                    >
                        <ListItemText 
                            primary={option.text} 
                            primaryTypographyProps={{
                                sx: { color: 'black', fontWeight: 'bold' } // Set text color and weight
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;