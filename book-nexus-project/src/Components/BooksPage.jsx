import React, { useEffect, useState } from 'react'
import Book from './Book'
import './styles.css'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Accordion, AccordionSummary, AccordionDetails, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from "@mui/material";
import { searchBooks } from '../api';
import  { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { getBooks } from '../api';

function BooksPage() {

    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetch('/api/books/test')
            .then(res => res.json())
            .then(data => {
                setBooks(data)
            })
            .catch(err => console.log(err))
    }, []);

    // useEffect(() => {
    //     getBooks({pageSize: 9, page}).then(setBooks)
    //   }, [getBooks, page])

    const theme = createTheme({
        typography: {
        //   fontFamily: 'Times New Roman, Arial',
        //   htmlFontSize: '12',
        }
      });

      const searchBooksWrapper = async (e) => {
        const res = await searchBooks(e);
        const page_res = res.slice(12*page, 12*(page + 1))
        setBooks(res);
      }

    return (
        <Box className='bookFeed' sx={{marginBottom: 2, width: '90%', marginX: 'auto'}}>
            <Box sx={{width: '75%', marginX: 'auto'}}>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <ThemeProvider theme={theme}>
                            <Typography variant="h5">Search Books</Typography>
                        </ThemeProvider>
                    </AccordionSummary>
                    <AccordionDetails>
                        <form onSubmit={searchBooksWrapper}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ThemeProvider theme={theme}>
                                        <Typography>
                                            <TextField
                                                label="Title"
                                                variant="standard"
                                                fullWidth
                                                name="Title"
                                            />
                                        </Typography>
                                    </ThemeProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <ThemeProvider theme={theme}>
                                        <Typography>
                                            <TextField
                                                label="Authors"
                                                variant="standard"
                                                fullWidth
                                                name="Authors"
                                            />
                                        </Typography>
                                    </ThemeProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <ThemeProvider theme={theme}>
                                        <Typography>
                                            <TextField
                                                label="Genres"
                                                variant="standard"
                                                fullWidth
                                                name="Genres"
                                            />
                                        </Typography>
                                    </ThemeProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <ThemeProvider theme={theme}>
                                        <Typography>
                                            <TextField
                                            label="Year"
                                            variant="standard"
                                            type="number"
                                            InputProps={{ inputProps: { min: 0 } }}
                                            fullWidth
                                            name="Year"
                                            />
                                        </Typography>
                                    </ThemeProvider>
                                    
                                </Grid>
                                <Grid item xs={12} sx={{marginTop: 1}}>
                                    <Button variant="contained" color="info" type="submit">
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                            </form>
                        </AccordionDetails>
                </Accordion>
            </Box>

            <Grid container spacing={2} sx={{marginTop: 2}}>
            {
                books && (books.slice(page*12, (page+1)*12)).map(({
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
            <Button onClick={() => setPage(page => page == 0 ? 0 : page - 1)}>Previous Page</Button>
            <Button onClick={() => setPage(page => page + 1)}>Next Page</Button>
            {page + 1}
        </Box>
    )
}

export default BooksPage;