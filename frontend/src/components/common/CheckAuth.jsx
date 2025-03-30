import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const CheckAuth = ({ isAuthenticated, user, children }) => {
    const location = useLocation();

    // If not authenticated and trying to access non-auth pages
    if (!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/register'))) {
        return <Navigate to="/auth/login" />
    }

    // If authenticated and trying to access login or register
    if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes("/register"))) {
        if (user?.role === 'admin') {
            return <Navigate to="/admin/Dashboard" />
        } else {
            return <Navigate to="/shop/home" />
        }
    }

    // If authenticated and user is not admin trying to access admin pages
    if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes("admin")) {
        return <Navigate to="/unauth-page" />
    }

    // If authenticated admin trying to access shop pages
    if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('shop')) {
        return <Navigate to='/admin/Dashboard' />
    }

    return <>{children}</>
}

export default CheckAuth
