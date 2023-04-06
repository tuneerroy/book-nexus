import React from 'react'
import books from '../TestBookData';
import Book from './Book'
import './styles.css'
import Grid from '@mui/material/Grid';

function BooksPage() {

    return (
        <div className='bookFeed'>
            <Grid container spacing={2}>
            {
                books.map(({
                    isbn, title, year, description, image_link
                }) => (
                    <Grid item xs={4} sx={{display:'flex', justifyContent:'center', py: 5}}> 
                        <Book
                            isbn={isbn}
                            title={title}
                            year={year}
                            description={description}
                            image_link={image_link}
                            />
                    </Grid>
                ))
            }
            </Grid>
        </div>
    )
}

export default BooksPage;