import React from 'react';
import {  Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ department }) => {
    const location = useLocation();

    const sidebarOptions = {
        procurement: [
            { text: 'Dashboard', path: '/dashboard' },
            { text: 'Add Stock', path: '/dashboard/addStock' },
            { text: 'View Stock', path: '/dashboard/viewStock' },
            { text: 'Add Supplier', path: '/dashboard/addSupplier' },
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
