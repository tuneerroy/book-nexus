import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {
  const [books, setBooks] = React.useState([]);
  const [authors, setAuthors] = React.useState([]);

  useEffect(() => {
    fetch('/api/favorites')
      .then(res => res.json())
      .then(data => {
        setBooks(data.books);
        setAuthors(data.authors);
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <div>
      <h1>Favorite Books</h1>
      <ul>
        {books & books.length ? books.map((book) => (
          <li key={book.isbn}>
            <Link to={`/books/${book.isbn}`}>{book.title}</Link>
          </li>
        )) : <h2>No favorite books yet.</h2>}
      </ul>
      <br />
      <h1>Favorite Authors</h1>
      <ul>
        {authors && authors.length ? authors.map((author) => (
          <li key={author.id}>
            <Link to={`/authors/${author.id}`}>{author.name}</Link>
          </li>
        )) : <h2>No favorite authors yet.</h2>}
      </ul>
    </div>
  )
}

export default HomePage;