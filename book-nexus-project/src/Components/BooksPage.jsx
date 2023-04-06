import React from 'react'
import books from '../TestBookData';
import Book from './Book'
import './styles.css'

function BooksPage() {

    return (
        <div className='bookFeed'>
            {
                books.map(({
                    isbn, title, year, description, image_link
                }) => (
                    <Book
                        isbn={isbn}
                        title={title}
                        year={year}
                        description={description}
                        image_link={image_link}
                        />
                ))
            }
        </div>
    )
}

export default BooksPage;