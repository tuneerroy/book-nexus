import React, { useEffect } from 'react';
import '../App.css'
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Header() {
    return (
        <div className='headerContainer'>
            <NavLink to={`../`} className="title">Book Nexus</NavLink>
        </div>
    )
}

export default Header;