import React, { useEffect } from 'react';
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
import AddRequisitionOrder from '../components/addRequisitionForm';
import EditRequisitionOrder from '../components/EditRequisitionForm';
import PurchaseOrder from '../components/purchaseOrder';
import AddPurchaseOrder from '../components/addPurchaseOrder';
import EditPurchaseOrder from '../components/editPurchaseOrder';
import { useNavbar } from '../context/NavbarContext';

const Dashboard = () => {
    const { user } = useUser();
    const { setNavbarTitle } = useNavbar();
                        
    useEffect(() => {
        setNavbarTitle("Stock Management");
        }, [setNavbarTitle]);

    if (!user) {
        return (
            <Typography variant="h6" color="error" align="center" mt={4}>
                Please log in to view the dashboard.
            </Typography>
        );
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(to bottom right, #FFFFFF, #FFFFFF)', // Example gradient background
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Header />
            <Box sx={{ display: 'flex', marginTop: '64px' }}>
                {/* Adjust to match the header height */}
                <Sidebar department={user.department} />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        backgroundColor: 'transparent', // Set to transparent to allow the background to show through
                    }}
                >
                    <Container>
                        <Routes>
                            {/* Procurement Department Routes */}
                            {user.department === 'procurement' && (
                                <>
                                    <Route path="addStock" element={<AddStock />} />
                                    <Route path="viewStock" element={<ViewStock />} />
                                    <Route path="editStock/:id" element={<EditStock />} />
                                    <Route path="addSupplier" element={<AddSupplier />} />
                                    <Route path="purchaseOrders" element={<PurchaseOrder />} />
                                    <Route path="addpurchaseOrders" element={<AddPurchaseOrder />} />
                                    <Route path="editrequisitionForm/:id" element={<EditRequisitionOrder />} />
                                    <Route path="editpurchaseOrders/:id" element={<EditPurchaseOrder />} />
                                    <Route path="requisitionForm" element={<RequisitionForm />} />
                                </>
                            )}

                            {/* Sales Department Routes */}
                            {user.department === 'sales' && (
                                <>
                                    <Route path="purchaseOrders" element={<PurchaseOrder />} />
                                    <Route path="addpurchaseOrders" element={<AddPurchaseOrder />} />
                                    <Route path="editpurchaseOrders/:id" element={<EditPurchaseOrder />} />
                                    <Route path="requisitionForm" element={<RequisitionForm />} />
                                    <Route path="addrequisitionForm" element={<AddRequisitionOrder />} />
                                    <Route path="editrequisitionForm/:id" element={<EditRequisitionOrder />} />
                                    <Route path="viewStock" element={<ViewStock />} />
                                </>
                            )}

                            {/* Stock Manager Department Routes */}
                            {user.department === 'stock_manager' && (
                                <>
                                    <Route path="addStock" element={<AddStock />} />
                                    <Route path="viewStock" element={<ViewStock />} />
                                    <Route path="editStock/:id" element={<EditStock />} />
                                </>
                            )}
                        </Routes>
                    </Container>
                </Box>
            </Box>
        </div>
    );
};

export default Dashboard;
