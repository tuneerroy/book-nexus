import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { AppBar, CircularProgress, Toolbar, Typography, Button } from '@mui/material';

const PrivateRoute = ({Component, ...props}) => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/auth/check')
            .then(res => res.json())
            .then(data => {
                // data.authenticated = true
                if (!data.authenticated) {
                    navigate('/login', { replace: true });
                } else {
                    setIsLoading(false);
                }
            })
            .catch(err => console.log(err))
    }, []);

    const handleLogout = () => {
        fetch('/api/auth/logout')
        .then(res => window.location.href = res.url)
        .catch(err => console.log(err))
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <CircularProgress />
            </div>
        )
    }
    
    return (
        <>
          <AppBar position="relative">
            <Toolbar>
              <Typography variant="h5" sx={{ flexGrow: 1 }}>
                <NavLink to={`/`} className="title">Book Nexus</NavLink>
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          <Toolbar />
          <Component {...props} />
        </>
    )
};

export default PrivateRoute;