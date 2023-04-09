import React from 'react'
import { NavLink } from 'react-router-dom';

function MainPage() {
    return <div className='mainPage'>
        <div className='mainPageText'>
            Welcome
            <NavLink to={`/books`} className="title">All Books</NavLink>
            <NavLink to={`/authors`} className="title">All Authors</NavLink>
        </div>
    </div>
}

export default MainPage;