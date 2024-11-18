import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AddStockPage from './components/AddStock';
import ViewStockPage from './components/ViewStock';
import EditStockPage from './components/EditStock';
import AddSupplierPage from './components/AddSupplier';
import ProtectedRoute from './components/ProtectedRoute';
import RequisitionForm from './components/requisitionForm';
import AddRequisitionOrder from './components/addRequisitionOrder';
import EditRequisitionForm from './components/EditRequisitionOrder';
import PurchaseOrderForm from './components/purchaseOrder';
import AddPurchaseOrder from './components/addPurchaseOrder';
import EditPurchaseOrder from './components/editPurchaseOrder';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    {/* Public route for login */}
                    <Route path="/" element={<LoginPage />} />

                    {/* Protected dashboard routes */}
                    <Route
                        path="/dashboard"
                        element={<ProtectedRoute element={<Dashboard />} />}
                    >
                        {/* Stock management */}
                        <Route
                            path="addStock"
                            element={<ProtectedRoute element={<AddStockPage />} />}
                        />
                        <Route
                            path="viewStock"
                            element={<ProtectedRoute element={<ViewStockPage />} />}
                        />
                        <Route
                            path="editStock/:id"
                            element={<ProtectedRoute element={<EditStockPage />} />}
                        />
                        <Route
                            path="addSupplier"
                            element={<ProtectedRoute element={<AddSupplierPage />} />}
                        />

                        {/* Purchase Orders */}
                        <Route
                            path="purchaseOrders"
                            element={<ProtectedRoute element={<PurchaseOrderForm />} />}
                        />
                        <Route
                            path="addpurchaseOrders"
                            element={<ProtectedRoute element={<AddPurchaseOrder />} />}
                        />
                        <Route
                            path="editpurchaseOrders/:id"
                            element={<ProtectedRoute element={<EditPurchaseOrder />} />}
                        />

                        {/* Requisition Orders */}
                        <Route
                            path="requisitionForm"
                            element={<ProtectedRoute element={<RequisitionForm />} />}
                        />
                        <Route
                            path="addrequisitionForm"
                            element={<ProtectedRoute element={<AddRequisitionOrder />} />}
                        />
                        <Route
                            path="editrequisitionOrder/:id"
                            element={<ProtectedRoute element={<EditRequisitionForm />} />}
                        />
                    </Route>
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
