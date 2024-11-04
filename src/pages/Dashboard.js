// src/pages/Dashboard.js
import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import AddStock from '../components/AddStock';
import ViewStock from '../components/ViewStock';
import EditStock from '../components/EditStock';
import { Container, Typography, Button, Box } from '@mui/material';

const Dashboard = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate(); // Use the useNavigate hook to programmatically navigate

    if (!user) {
        return <Typography variant="h6" color="error">Please log in to view the dashboard.</Typography>;
    }

    const handleLogout = () => {
        logout(); // Call the logout function from context
        navigate('/'); // Redirect to the login page
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {user.department} Dashboard
            </Typography>
            <Box display="flex" gap={2} mb={3}>
                {user.department === 'procurement' && (
                    <>
                        <Button component={Link} to="add-stock" variant="contained" color="primary">
                            Add Stock
                        </Button>
                        <Button component={Link} to="view-stock" variant="contained" color="secondary">
                            View Stock
                        </Button>
                    </>
                )}
                {user.department === 'sales' && (
                    <>
                        <Button component={Link} to="view-stock" variant="contained" color="secondary">
                            View Sales Stock
                        </Button>
                        {/* Add any other buttons specific to sales */}
                    </>
                )}
            </Box>
            <Button variant="contained" color="error" onClick={handleLogout}>
                Logout
            </Button>
            <Routes>
                {user.department === 'procurement' && (
                    <>
                        <Route path="add-stock" element={<AddStock />} />
                        <Route path="view-stock" element={<ViewStock />} />
                        <Route path="edit-stock/:id" element={<EditStock />} />
                        
                    </>
                )}
                {user.department === 'sales' && (
                    <>
                        <Route path="view-stock" element={<ViewStock />} />
                        {/* Add any specific component for sales here */}
                    </>
                )}
                <Route path="edit-stock/:id" element={<EditStock />} />
            </Routes>
        </Container>
    );
};

export default Dashboard;