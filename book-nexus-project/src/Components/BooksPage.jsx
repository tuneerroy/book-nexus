import React, { useEffect, useState } from 'react'
import Book from './Book'
import './styles.css'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import ExpandIcon from '@mui/icons-material/Expand';

function BooksPage() {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('/api/books/test')
            .then(res => res.json())
            .then(data => {
                setBooks(data)
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <Box className='bookFeed' sx={{marginBottom: 2, width: '90%', marginX: 'auto'}}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandIcon />}>
                    <h3>Book Form</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={1}>
                                <TextField
                                    label="Title"
                                    variant="outlined"
                                />
                                </Grid>
                            <Grid item xs={1}>
                                <TextField
                                    label="Authors"
                                    variant="outlined"
                                />
                                </Grid>
                            <Grid item xs={1}>
                                <TextField
                                    label="Genres"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <TextField
                                    label="Year"
                                    variant="outlined"
                                    type="number"
                                    InputProps={{ inputProps: { min: 0 } }}
                                />
                            </Grid>
                            <Grid item xs={2} sx={{marginTop: 1}}>
                                <Button variant="contained" color="primary" type="submit">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                        </form>
                    </AccordionDetails>
            </Accordion>

            <Grid container spacing={2} sx={{marginTop: 2}}>
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
        </Box>
    )
}

export default BooksPage;