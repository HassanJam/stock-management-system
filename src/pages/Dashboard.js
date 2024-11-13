import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import AddStock from '../components/AddStock';
import ViewStock from '../components/ViewStock';
import EditStock from '../components/EditStock';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Box, Container, Typography } from '@mui/material';
import AddSupplier from '../components/AddSupplier';
import RequisitionForm from '../components/requisitionForm';
import AddPurchaseOrder from '../components/addRequisitionOrder';
import EditPurchaseOrder from '../components/EditRequisitionOrder';

const Dashboard = () => {
    const { user } = useUser();

    if (!user) {
        return <Typography variant="h6" color="error">Please log in to view the dashboard.</Typography>;
    }



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
                                    <Route path="addStock" element={<AddStock />} />
                                    <Route path="viewStock" element={<ViewStock />} />
                                    <Route path="editStock/:id" element={<EditStock />} />
                                    <Route path="editRequisitionOrder/:id" element={<EditPurchaseOrder />} />
                                    <Route path="addSupplier" element={<AddSupplier />} />
                                    <Route path="requisitionForm" element={<RequisitionForm />} />
                                </>
                            )}
                            {user.department === 'sales' && (
                                <>
                                    <Route path="requisitionForm" element={<RequisitionForm />} />
                                    <Route path="addRequisitionOrder" element={<AddPurchaseOrder />} />
                                    <Route path="editRequisitionOrder/:id" element={<EditPurchaseOrder />} />
                                    <Route path="viewStock" element={<ViewStock />} />
                                </>
                            )}
                            {user.department === 'stock_manager' && (
                                <>
                                    <Route path="addStock" element={<AddStock />} />
                                    <Route path="viewStock" element={<ViewStock />} />
                                    <Route path="editStock/:id" element={<EditStock />} />

                                </>
                            )}
                            <Route path="editStock/:id" element={<EditStock />} />
                        </Routes>
                    </Container>
                </Box>
            </Box>
        </div>
    );
};

export default Dashboard;
