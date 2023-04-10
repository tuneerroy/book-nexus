import React from 'react'
import { NavLink } from 'react-router-dom';

function MainPage() {
    return <div className='mainPage'>
        <div className='mainPageText'>
            <a target="_blank" href="https://www.youtube.com/watch?v=hHkKJfcBXcw">Yo I like trains.</a>
            <NavLink to={`/books`} className="title">All Books</NavLink>
            <NavLink to={`/authors`} className="title">All Authors</NavLink>
        </div>
    </div>
}

export default MainPage;