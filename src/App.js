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
import AddPurchaseOrder from './components/AddPurchaseOrder';
import EditPurchaseOrder from './components/EditPurchaseOrder.js';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    {/* Public route for login */}
                    <Route path="/" element={<LoginPage />} />

                    {/* Protected routes */}
                    <Route
                        path="/dashboard/*"
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
                            path="purchase-order/*"
                            element={<ProtectedRoute element={<PurchaseOrderPage />} />}
                        >
                            <Route
                                path="add-purchase-order"
                                element={<ProtectedRoute element={<AddPurchaseOrder />} />}
                            />
                            <Route
                                path="edit-purchase-order/:id"
                                element={<ProtectedRoute element={<EditPurchaseOrder />} />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
