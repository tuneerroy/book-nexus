import React from 'react'
import { NavLink } from 'react-router-dom'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Avatar from '@mui/material/Avatar';

function AuthorRow({authors}) {
  const shorten = (str) => {
    if (str.length > 36) return str.slice(0, 36) + '...'
    return str
  }

  const getColorFromRating = (rating) => {
    // const minColor = [0, 0, 250]; // dark blue
    // const maxColor = [135, 206, 250]; // light blue
    // const transformValue = i => Math.floor(minColor[i] + (maxColor[i] - minColor[i]) * rating / 5)
    rating = Math.floor(rating)
    switch (rating) {
      case 1:
        return '#90e0ef'
      case 2:
        return '#00b4d8'
      case 3:
        return '#0077b6'
      case 4:
        return '#023e8a'
      case 5:
        return '#03045e'
      default:
        return '#90e0ef'
    }
    // return `rgb(${r}, ${g}, ${b})`;
  }

  const formatCategories = (genres) => {
    if (genres === undefined || genres === null || genres.length === 0) return <span className='italic'>No Genres</span>
    if (genres.length > 1) return <><span className='font-medium'>{genres[0]}</span>...</>
    return <span className='font-medium'>{genres[0]}</span>
  }

  const stringToInitials = str => str.split(' ').map((word) => word.charAt(0)).join('')

  return (
    <div className='flex flex-row w-full space-x-2 md:space-x-6 mt-12'>
      {authors && authors.map(author => (
        <div key={author.id} className='w-[14.2857%] flex flex-col'>
          <NavLink to={`/authors/${author.id}`}>
            <Avatar sx={{bgcolor: getColorFromRating(author.priority), width: 100, height: 100}} >{stringToInitials(author.name)}</Avatar>
          </NavLink>
          <div className='h-8 w-8 relative bottom-3 left-1 bg-white rounded-full'>
            <CircularProgressbar value={author.priority} maxValue={5} text={`${Math.round(author.priority * 10) / 10}`} 
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
          <NavLink to={`/authors/${author.id}`}>
            <div className='text-xs font-bold'>{shorten(author.name)}</div>
          </NavLink>
          <div className='text-xs font-bold'>{formatCategories(author.categories)}</div>
        </div>
      ))}
    </div>
  )
}

export default AuthorRow