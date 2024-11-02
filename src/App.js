// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AddStockPage from './components/AddStock';
import ViewStockPage from './components/ViewStock';
import ProtectedRoute from './components/ProtectedRoute';

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
                    </Route>
                    {/* More routes can be added here */}
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
