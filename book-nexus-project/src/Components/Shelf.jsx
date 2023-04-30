import React, { useEffect, useState } from 'react'
import BookRow from './BookRow'
import AuthorRow from './AuthorRow'
import  { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import LinearProgress from '@mui/material/LinearProgress'

function Shelf({title, getItems, purpose="books", params}) {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  useEffect(() => {
    getItems({...params, pageSize: 7, page})
      .then(data => setItems(data))
      .finally(() => setLoading(false))
  }, [params, getItems, page])
  
  return (
    <div>
      <h2 className='text-2xl font-semibold my-5'>{title}</h2>
      {loading ? <LinearProgress /> : 
      <div className='flex flex-row w-full min-h-[10vw]'>
        {items.length ?
        <>
          <BsChevronCompactLeft className='text-3xl relative top-[7vw] cursor-pointer' onClick={() => setPage(page => page - 1)}/>
          {purpose === "books" ? <BookRow books={items} /> : <AuthorRow authors={items} />}
          <BsChevronCompactRight className='text-3xl relative top-[7vw] cursor-pointer' onClick={() => setPage(page => page + 1)}/>
        </> : <div>No items to display</div>}
      </div>}
    </div>
  )
}

export default Shelf