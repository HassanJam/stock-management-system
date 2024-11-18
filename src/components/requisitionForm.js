import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Paper, List, ListItem, ListItemText, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import api from '../api/api.js';

const { requisitionApi } = api;

const RequisitionForm = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [rejectedOrders, setRejectedOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // State for the selected order
    const [isDialogOpen, setDialogOpen] = useState(false);    // State for dialog open/close
    const navigate = useNavigate();
    const { user } = useUser();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${requisitionApi}`);
                const orders = response.data;
    
                // Log response to check data structure
                console.log('Fetched orders:', orders);
    
                // Filter and set orders based on status
                setPendingOrders(orders.filter(order => order.status === 'pending'));
                setCompletedOrders(orders.filter(order => order.status === 'completed'));
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
            <Typography variant="subtitle1">Project Name: {order.projectName}</Typography>
            <Typography variant="body2">Date: {new Date(order.date).toLocaleDateString()}</Typography>
            <Typography variant="subtitle1">Client Name: {order.clientName}</Typography>

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
                    onClick={() => navigate(`/dashboard/editRequisitionForm/${order.id}`)}
                >
                    Edit Order
                </Button>
            </Box>
        </>
    );

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Requisition Form Dashboard
            </Typography>

            {user?.department === 'sales' && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/dashboard/addrequisitionForm`)}
                    sx={{ mb: 3 }}
                >
                    Add New Form
                </Button>
            )}

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

                {/* Completed Orders */}
                <Box sx={{ width: '30%' }}>
                    <Typography variant="h6" align="center">
                        Completed Orders
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                        <List>
                            {completedOrders.length > 0 ? (
                                completedOrders.map((order) => (
                                    <React.Fragment key={order.id}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemText primary={renderOrderDetails(order)} />
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))
                            ) : (
                                <Typography align="center">No completed orders</Typography>
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

            {/* Dialog for requisition details */}
            <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Requisition Details</DialogTitle>
                <DialogContent dividers>
                    {selectedOrder && (
                        <>
                            <Typography variant="subtitle1">Project Name: {selectedOrder.projectName}</Typography>
                            <Typography variant="subtitle1">Client Name: {selectedOrder.clientName}</Typography>
                            <Typography variant="body2">Date: {new Date(selectedOrder.date).toLocaleDateString()}</Typography>
                            <Typography variant="body2">Description:</Typography>
                            <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>{selectedOrder.description}</Typography>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="subtitle2">Status:</Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    mt: 1,
                                    color:
                                        selectedOrder.status === "pending"
                                            ? "orange"
                                            : selectedOrder.status === "completed"
                                                ? "green"
                                                : "red",
                                }}
                            >
                                {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                            </Typography>
                        </>
                    )}
                </DialogContent>
            </Dialog>

        </Box>
    );
};

export default RequisitionForm;
