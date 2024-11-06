import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import AddStock from '../components/AddStock';
import ViewStock from '../components/ViewStock';
import EditStock from '../components/EditStock';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Box, Container, Typography } from '@mui/material';
import AddSupplier from '../components/AddSupplier';
import PurchaseOrder from '../components/PurchaseOrder';

const Dashboard = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    if (!user) {
        return <Typography variant="h6" color="error">Please log in to view the dashboard.</Typography>;
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(to bottom right, #e3f2fd, #bbdefb)', // Example gradient background
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Header />
            <Box sx={{ display: 'flex', marginTop: '64px' }}> {/* Adjust to match the header height */}
                <Sidebar department={user.department} />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        backgroundColor: 'transparent' // Set to transparent to allow the background to show through
                    }}
                >
                    <Container>
                        <Routes>
                            {user.department === 'procurement' && (
                                <>
                                    <Route path="add-stock" element={<AddStock />} />
                                    <Route path="view-stock" element={<ViewStock />} />
                                    <Route path="edit-stock/:id" element={<EditStock />} />
                                    <Route path="add-supplier" element={<AddSupplier />} />
                                    <Route path="purchase-order" element={<PurchaseOrder />} />
                                </>
                            )}
                            {user.department === 'sales' && (
                                <>
                                    <Route path="purchase-order" element={<PurchaseOrder />} />
                                    <Route path="view-stock" element={<ViewStock />} />
                                </>
                            )}
                            <Route path="edit-stock/:id" element={<EditStock />} />
                        </Routes>
                    </Container>
                </Box>
            </Box>
        </div>
    );
};

export default Dashboard;
