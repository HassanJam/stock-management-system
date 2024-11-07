import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ element }) => {
    const { user } = useUser();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return element;
};

export default ProtectedRoute;
