import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { getBook, getBooks } from '../api';
import BookRow from './BookRow';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Book() {
  const {id: isbn} = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    getBook(isbn).then(setBook)
  }, [isbn]);

  const handleImageLoad = (e) => {
    if (e.target.naturalWidth === 1 && e.target.naturalHeight === 1) {
      e.target.src = 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg';
    }
  }

  const {title, year, description, image_link, categories, authors, rating, num_reviews} = book;

  return (
    <div className='py-5 space-y-8'>
      <div className='flex flex-col md:flex-row px-20 md:space-x-16'>
        <img className='min-w-[160px] w-1/5 h-auto rounded-lg' src={image_link} alt={title} onLoad={handleImageLoad}/>
        <div className='w-4/5 flex flex-col justify-center'>
          <h2 className='text-4xl font-bold'>{title}</h2>
          <div>{year} • {categories ? categories.join(', ') : <span className='italic'>No Categories</span>}</div>
          <div className='my-2 flex flex-row items-center space-x-3'>
            <div className='w-14 h-14'>
              <CircularProgressbar value={rating} maxValue={5} text={`${Math.round(rating * 10) / 10}/5`} 
                styles={{
                  path: {
                    stroke: `rgb(245 158 11)`,
                  },
                  text: {
                    fill: 'rgb(245 158 11)',
                    fontSize: '28px',
                    fontWeight: 'bold',
                  },
                }}
              />
            </div>
            <span> | {num_reviews} reviewers</span>
          </div>
          <div>
            <div className='text-2xl font-medium'>Description</div>
            <div>{description}</div>
          </div>
          <div className='mt-4'>
            <div className='text-xl font-medium'>Authors</div>
            <div className='flex flex-row space-x-2'>
              {authors ? authors.map(author => (
                <NavLink key={author.id} to={`/authors/${author.id}`} className='font-medium text-blue-600 hover:text-blue-800'>{author.name}</NavLink>
              )):
              <span className='italic'>No Authors</span>}
            </div>
          </div>
        </div>
      </div>
      <div className='px-20'>
        <h2 className='text-2xl font-semibold my-5'>Books by the same author</h2>
        <BookRow getBooks={() => getBooks({'categories': ['Cooking'], 'rating_low': 3.0})}/>
      </div>
      <div className='px-20'>
        <h2 className='text-2xl font-semibold my-5'>Books by the same author</h2>
        <BookRow getBooks={() => getBooks({'categories': ['History'], 'rating_low': 3.0})}/>
      </div>
    </div>
  )
}

export default Book;