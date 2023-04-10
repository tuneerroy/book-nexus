import React, { useEffect } from 'react';
import '../App.css'
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Header() {
    console.log(window.location.pathname)
    const isLoginPage = window.location.pathname === '/login';
    
    useEffect(() => {
        if (!isLoginPage) {
            fetch('/api/authcheck')
                .then(res => res.json())
                .then(data => {
                    if (!data.authenticated) {
                        window.location.href = '/login';
                    }
                })
                .catch(err => console.log(err))
        }
    }, []);

    return (
        <div className='headerContainer'>
            <NavLink to={`../`} className="title">Book Nexus</NavLink>
        </div>
    )
}

export default Header;