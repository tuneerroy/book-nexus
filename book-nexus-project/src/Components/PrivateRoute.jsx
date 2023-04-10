import React, { useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const PrivateRoute = ({Component, ...props}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            setIsAuthenticated(true);
            setIsLoading(false);
            return;
        }
        fetch('/api/auth/check')
            .then(res => res.json())
            .then(data => {
                setIsAuthenticated(data.authenticated);
                setIsLoading(false);
            })
            .catch(err => console.log(err))
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <CircularProgress />
            </div>
        )
    }
    return isAuthenticated ?  <Component {...props} /> : <Navigate to='/login' />
};

export default PrivateRoute;