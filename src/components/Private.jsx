import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const Private = () => {
    const { currentUser } = useAuth()
    const auth = currentUser? true : false;
    return auth ? <Outlet /> : <Navigate to="/signup" />;
}

export default Private