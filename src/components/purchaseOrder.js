import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Paper, List, ListItem, ListItemText, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const PurchaseOrder = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [approvedOrders, setApprovedOrders] = useState([]);
    const [rejectedOrders, setRejectedOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // State for the selected order
    const [isDialogOpen, setDialogOpen] = useState(false);    // State for dialog open/close
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/purchaseOrders/');
                const orders = response.data;
                setPendingOrders(orders.filter(order => order.status === 'pending'));
                setApprovedOrders(orders.filter(order => order.status === 'approved'));
                setRejectedOrders(orders.filter(order => order.status === 'rejected'));
            } catch (error) {
                console.error('Error fetching orders:', error);
                alert('Failed to load orders.');
            }
        };

        fetchOrders();
    }, []);

    // Open dialog with selected order details
    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setDialogOpen(true);
    };

    // Close dialog
    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedOrder(null);
    };

    const renderOrderDetails = (order) => (
        <>
            <Typography variant="subtitle1">Client: {order.client}</Typography>
            <Typography variant="body2">Submission Date: {new Date(order.submission_date).toLocaleDateString()}</Typography>
            <Typography variant="h6" color="primary">Total: ${parseFloat(order.total).toFixed(2)}</Typography>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleViewDetails(order)}
                >
                    View Details
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate(`/dashboard/edit-purchase-order/${order.id}`)}
                >
                    Edit Order
                </Button>
            </Box>
        </>
    );

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Purchase Order Dashboard
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(`/dashboard/add-purchase-order`)}
                sx={{ mb: 3 }}
            >
                Add New PO
            </Button>

            <Outlet />

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                {/* Pending Orders */}
                <Box sx={{ width: '30%' }}>
                    <Typography variant="h6" align="center">
                        Pending Orders
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <List>
                            {pendingOrders.length > 0 ? (
                                pendingOrders.map((order) => (
                                    <React.Fragment key={order.id}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemText primary={renderOrderDetails(order)} />
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

                {/* Approved Orders */}
                <Box sx={{ width: '30%' }}>
                    <Typography variant="h6" align="center">
                        Approved Orders
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <List>
                            {approvedOrders.length > 0 ? (
                                approvedOrders.map((order) => (
                                    <React.Fragment key={order.id}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemText primary={renderOrderDetails(order)} />
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))
                            ) : (
                                <Typography align="center">No approved orders</Typography>
                            )}
                        </List>
                    </Paper>
                </Box>

                {/* Rejected Orders */}
                <Box sx={{ width: '30%' }}>
                    <Typography variant="h6" align="center">
                        Rejected Orders
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <List>
                            {rejectedOrders.length > 0 ? (
                                rejectedOrders.map((order) => (
                                    <React.Fragment key={order.id}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemText primary={renderOrderDetails(order)} />
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

            {/* Dialog for order details */}
            <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Order Details</DialogTitle>
                <DialogContent dividers>
                    {selectedOrder && (
                        <>

                            <Typography variant="subtitle2">Items:</Typography>
                            <List dense>
                                {selectedOrder.items.map((item) => (
                                    <ListItem key={item.id}>
                                        <ListItemText
                                            primary={item.item_name}
                                            secondary={`Quantity: ${item.quantity} | Unit Price: $${parseFloat(item.unit_price).toFixed(2)} | Total: $${parseFloat(item.total_price).toFixed(2)}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="subtitle1">Client: {selectedOrder.client}</Typography>
                            <Typography variant="body2">Submission Date: {new Date(selectedOrder.submission_date).toLocaleDateString()}</Typography>
                            <Typography variant="body2">Tax: ${parseFloat(selectedOrder.tax).toFixed(2)}</Typography>
                            <Typography variant="body2">Shipping: ${parseFloat(selectedOrder.shipping).toFixed(2)}</Typography>
                            <Typography variant="body2">Other: ${parseFloat(selectedOrder.other).toFixed(2)}</Typography>
                            <Typography variant="body2">Subtotal: ${parseFloat(selectedOrder.subtotal).toFixed(2)}</Typography>
                            <Typography variant="h6" color="primary">Total: ${parseFloat(selectedOrder.total).toFixed(2)}</Typography>


                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PurchaseOrder;
