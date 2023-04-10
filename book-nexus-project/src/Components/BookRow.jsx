import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function BookRow({books}) {
  const shorten = (str) => {
    if (str.length > 36) return str.slice(0, 36) + '...'
    return str
  }

  const formatAuthor = (authors) => {
    if (authors === undefined || authors === null || authors.length === 0) return <span className='italic'>No Authors</span>
    if (authors.length > 1) return <><NavLink to={`/authors/${authors[0].id}`}>{authors[0].name}</NavLink>...</>
    return <NavLink to={`/authors/${authors[0].id}`}>{authors[0].name}</NavLink>
  }

  const formatGenre = (genres) => {
    if (genres === undefined || genres === null || genres.length === 0) return <span className='italic'>No Genres</span>
    if (genres.length > 1) return <><span className='font-medium'>{genres[0]}</span>...</>
    return <span className='font-medium'>{genres[0]}</span>
  }

  return (
    <div className='flex flex-row w-full space-x-2 md:space-x-6'>
      {books.map(book => (
        <div key={book.isbn} className='w-[14.2857%] flex flex-col'>
          <NavLink to={`/books/${book.isbn}`}>
            <img className='w-full h-[15vw] object-cover rounded-lg' src={book.image_link} alt='book'/>
          </NavLink>
          <div className='h-8 w-8 relative bottom-3 left-1 bg-white rounded-full'>
            <CircularProgressbar value={book.rating} maxValue={5} text={`${Math.round(book.rating * 10) / 10}`} 
              styles={{
                path: {
                  stroke: `rgb(245 158 11)`,
                },
                text: {
                  fill: 'rgb(245 158 11)',
                  fontSize: '36px',
                  fontWeight: 'bold',
                },
              }}
            />
          </div>
          <NavLink to={`/books/${book.isbn}`}>
            <div className='text-xs font-bold'>{shorten(book.title)}</div>
          </NavLink>
          <div className='text-xs'>{formatAuthor(book.authors)}</div>
          <div className='text-xs'>{formatGenre(book.categories)}</div>
        </div>
      ))}
    </div>
  )
}

export default BookRow