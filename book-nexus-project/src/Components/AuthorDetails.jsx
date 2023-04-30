import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { getAuthor, getBooks } from '../api';
import Shelf from './Shelf';
import FavoritesButton from './FavoritesButton';

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
      <div className='flex flex-col md:flex-row justify-between'>
        <div>
          <h1 className='text-2xl'>Author: <span className='font-bold'>{authorName}</span></h1>
          <div>
            <h2 className='text-2xl font-semibold my-5'>Similar authors</h2>
            <div className='space-x-3'>
              {authors.map(author => (
                <NavLink key={author.id} to={`/authors/${author.id}`} className='text-lg font-medium text-blue-600 hover:text-blue-800'>{author.name}</NavLink>
                ))}
            </div>
          </div>
        </div>
        <div className='mt-3 md:mt-0'><FavoritesButton purpose="authors" itemId={id}/></div>
      </div>
      <Shelf title={`Top books by ${authorName}`} getItems={getBooks} params={{authors: [authorName]}}/>
    </div>
  )
}

export default AuthorDetails