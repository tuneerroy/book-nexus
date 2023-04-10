import React, { useEffect, useState } from 'react'
import BookRow from './BookRow'
import  { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'

function Shelf({title, getBooks, params}) {
  const [books, setBooks] = useState([])
  const [page, setPage] = useState(1)
  useEffect(() => {
    getBooks({...params, pageSize: 7, page}).then(setBooks)
  }, [params, getBooks, page])

  return (
    <div>
      <h2 className='text-2xl font-semibold my-5'>{title}</h2>
      <div className='flex flex-row w-full min-h-[15vw]'>
        <BsChevronCompactLeft className='text-3xl relative top-[7vw] cursor-pointer' onClick={() => setPage(page => page - 1)}/>
        <BookRow books={books} />
        <BsChevronCompactRight className='text-3xl relative top-[7vw] cursor-pointer' onClick={() => setPage(page => page + 1)}/>
      </div>
    </div>
  )
}

export default Shelf