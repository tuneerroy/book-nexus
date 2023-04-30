import React from 'react'
import Shelf from './Shelf'

const AuthorRecs = ({ favoriteAuthors }) => {
  const getAuthors = async ({page, pageSize}) => {
    try {
      const response = await fetch(`/api/authors/recommendations/authorList?authorList=${favoriteAuthors.join(',')}&page=${page}&pageSize=${pageSize}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Shelf title={"Author Recommendations"} getItems={getAuthors} purpose={"authors"} />
  )
}

export default AuthorRecs
