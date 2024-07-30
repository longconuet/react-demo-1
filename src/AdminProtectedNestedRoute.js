import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

const AdminProtectedNestedRoute = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const authAccount = useSelector(state => state.auth.account);
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default AdminProtectedNestedRoute;