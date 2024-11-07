// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AddStockPage from './components/AddStock';
import ViewStockPage from './components/ViewStock';
import EditStockPage from './components/EditStock';
import AddSupplierPage from './components/AddSupplier';
import PurchaseOrderPage from './components/PurchaseOrder';
import ProtectedRoute from './components/ProtectedRoute';
import AddPurchaseOrderRequest from './components/AddPurchaseOrderRequest';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route 
                        path="/dashboard" 
                        element={<ProtectedRoute element={<Dashboard />} />} 
                    >
                        <Route 
                            path="add-stock" 
                            element={<ProtectedRoute element={<AddStockPage />} />} 
                        />
                        <Route 
                            path="view-stock" 
                            element={<ProtectedRoute element={<ViewStockPage />} />} 
                        />
                        <Route 
                            path="edit-stock/:id" 
                            element={<ProtectedRoute element={<EditStockPage />} />} 
                        />
                        <Route 
                            path="add-supplier" 
                            element={<ProtectedRoute element={<AddSupplierPage />} />} 
                        />
                        <Route 
                            path="purchase-order" 
                            element={<ProtectedRoute element={<PurchaseOrderPage />} />} 
                        />
                        <Route 
                            path="add-purchase-order-request" 
                            element={<ProtectedRoute element={<AddPurchaseOrderRequest />} />} 
                        />
                        
                        
                        </Route>
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
