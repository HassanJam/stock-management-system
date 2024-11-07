import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import axios from 'axios';

const PurchaseOrder = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [acceptedOrders, setAcceptedOrders] = useState([]);
    const [rejectedOrders, setRejectedOrders] = useState([]);

    useEffect(() => {
        // Fetch all POs and categorize them by status
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/purchase-orders');
                const orders = response.data;

                // Categorize orders based on their status
                setPendingOrders(orders.filter(order => order.status === 'pending'));
                setAcceptedOrders(orders.filter(order => order.status === 'accepted'));
                setRejectedOrders(orders.filter(order => order.status === 'rejected'));
            } catch (error) {
                console.error('Error fetching orders:', error);
                alert('Failed to load orders.');
            }
        };

        fetchOrders();
    }, []);

    // Navigate to the form for adding a new PO
    const handleAddNewPO = () => {
        window.location.href = '/add-purchase-order-request';
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Purchase Order Dashboard
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddNewPO}
                sx={{ mb: 3 }}
            >
                Add New PO
            </Button>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                {/* Pending Orders Column */}
                <Box sx={{ width: '30%' }}>
                    <Typography variant="h6" align="center">
                        Pending Orders
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <List>
                            {pendingOrders.length > 0 ? (
                                pendingOrders.map((order) => (
                                    <React.Fragment key={order.id}>
                                        <ListItem>
                                            <ListItemText
                                                primary={order.item_name}
                                                secondary={`Qty: ${order.quantity} | Total: $${order.total_price}`}
                                            />
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))
                            ) : (
                                <Typography align="center">No pending orders</Typography>
                            )}
                        </List>
                    </Paper>
                </Box>

                {/* Accepted Orders Column */}
                <Box sx={{ width: '30%' }}>
                    <Typography variant="h6" align="center">
                        Accepted Orders
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <List>
                            {acceptedOrders.length > 0 ? (
                                acceptedOrders.map((order) => (
                                    <React.Fragment key={order.id}>
                                        <ListItem>
                                            <ListItemText
                                                primary={order.item_name}
                                                secondary={`Qty: ${order.quantity} | Total: $${order.total_price}`}
                                            />
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))
                            ) : (
                                <Typography align="center">No accepted orders</Typography>
                            )}
                        </List>
                    </Paper>
                </Box>

                {/* Rejected Orders Column */}
                <Box sx={{ width: '30%' }}>
                    <Typography variant="h6" align="center">
                        Rejected Orders
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <List>
                            {rejectedOrders.length > 0 ? (
                                rejectedOrders.map((order) => (
                                    <React.Fragment key={order.id}>
                                        <ListItem>
                                            <ListItemText
                                                primary={order.item_name}
                                                secondary={`Qty: ${order.quantity} | Total: $${order.total_price}`}
                                            />
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))
                            ) : (
                                <Typography align="center">No rejected orders</Typography>
                            )}
                        </List>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default PurchaseOrder;
