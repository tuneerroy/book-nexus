import React from 'react'
import Shelf from './Shelf'

const BookRecs = ({ favoriteBooks }) => {
  const getBooks = async () => {
    try {
      const response = await fetch(`/api/books/recommendations/category?books=${favoriteBooks.join(',')}`)
      const data = await response.json()
      console.error(data)
      return data
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <Shelf title={"Book Recommendations"} getItems={getBooks} purpose={"books"} />
  )
}

export default BookRecs
