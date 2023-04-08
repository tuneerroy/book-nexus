
import React, { useEffect } from 'react'
import books from '../TestBookData';
import Book from './Book'
import './styles.css'
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import { getBooks } from '../api';

function BooksPage() {

// for testing
    // useEffect(() => {
    //   getBooks(['Fiction'], [], 2000, 2003, 2, 4).then((data) => {
    //     console.log(data);
    //   });
    // }, []);

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
}

export default BooksPage;