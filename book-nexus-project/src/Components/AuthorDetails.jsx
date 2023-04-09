import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { getAuthor, getBooks } from '../api';
import BookRow from './BookRow';

const authors = [
  { id: 1, name: 'J.K. Rowling' },
  { id: 2, name: 'J.R.R. Tolkien' },
  { id: 3, name: 'Stephen King' },
]

function AuthorDetails() {
  const { id } = useParams();
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    getAuthor(id).then(setAuthorName)
  }, [id]);

  return (
    <div className='py-5 px-20'>
      <h1 className='text-2xl'>Author: <span className='font-bold'>{authorName}</span></h1>
      <div>
        <h2 className='text-2xl font-semibold my-5'>Similar authors</h2>
        <div className='space-x-3'>
          {authors.map(author => (
            <NavLink key={author.id} to={`/authors/${author.id}`} className='text-lg font-medium text-blue-600 hover:text-blue-800'>{author.name}</NavLink>
          ))}
        </div>
      </div>
      <div>
        <h2 className='text-2xl font-semibold my-5'>Top Books by {authorName}</h2>
        <BookRow getBooks={() => getBooks({'categories': ['Fiction'], 'rating_high': 3.0, pageSize: 7, page: 1})}/>
      </div>
    </div>
  )
}

export default AuthorDetails