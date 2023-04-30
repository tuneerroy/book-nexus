import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {
  AppBar,
  CircularProgress,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

const PrivateRoute = ({ Component, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/auth/check")
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          navigate("/", { replace: true });
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    fetch("/api/auth/logout")
      .then((res) => (window.location.href = res.url))
      .catch((err) => console.log(err));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <AppBar position="relative" sx={{ backgroundColor: "#023047" }}>
        <Toolbar>
          <Typography variant="h5" sx={{ paddingRight: 5 }}>
            <NavLink to={`/home`} className="title">
              Book Nexus
            </NavLink>
          </Typography>
          <Button color="inherit" component={NavLink} to="/books">
            Books
          </Button>
          <Button color="inherit" component={NavLink} to="/recommendations">
            Recommendations
          </Button>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{ marginLeft: "auto" }}
          >
            <strong>Logout</strong>
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Component {...props} />
    </>
  );
};

export default PrivateRoute;
