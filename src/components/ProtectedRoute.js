// /frontend/src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ element }) => {
    const { user } = useUser();

    return user ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
