import React from 'react';
import '../App.css'
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <div className='headerContainer'>
            <NavLink to={`../`} className="title">Book Nexus</NavLink>
        </div>
    )
}

export default Header;