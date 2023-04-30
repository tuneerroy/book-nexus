import React, { useEffect, useState } from 'react'
import Book from './Book'
import './styles.css'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import {Accordion, AccordionSummary, AccordionDetails, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from "@mui/material";
import { searchBooks, getBooks } from '../api';

function BooksPage() {

    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(0);
    const [checked, setChecked] = useState(false);

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

      const handleFormSubmit = async (e) => {
        e.preventDefault();
        const authors = e.target.Authors.value.length === 0 ? undefined : e.target.Authors.value.split(',').map(author => author.trim());
        const categories = e.target.Genres.value.length === 0 ? undefined : e.target.Genres.value.split(',').map(category => category.trim());
        const year_low = e.target.YearLow.value.length === 0 ? undefined : e.target.YearLow.value;
        const year_high = e.target.YearHigh.value.length === 0 ? undefined : e.target.YearHigh.value;
        const rating_low = e.target.RatingLow.value.length === 0 ? undefined : e.target.RatingLow.value;
        const rating_high = e.target.RatingHigh.value.length === 0 ? undefined : e.target.RatingHigh.value;

        const res = await getBooks({authors, categories, year_low, year_high, rating_low, rating_high});
        setBooks(res);
        setPage(0);
      }

      const handleKeywordSubmit = async (e) => {
        e.preventDefault();
        const keywords = e.target.search.value.split(' ')
        const res = await searchBooks(keywords);
        setBooks(res);
        setPage(0);
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
                    <Switch
                      helpertext="test"
                      checked={checked}
                      onChange={() => setChecked(c => !c)}
                      // inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <Typography variant="">Search by keyword</Typography>
                    {checked ? <form onSubmit={handleKeywordSubmit}>
                                  <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <ThemeProvider theme={theme}>
                                            <Typography>
                                                <TextField
                                                    label="Search by keyword"
                                                    variant="standard"
                                                    fullWidth
                                                    name="search"
                                                />
                                            </Typography>
                                        </ThemeProvider>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={12} sx={{marginTop: 1}}>
                                    <Button variant="contained" color="info" type="submit">
                                        Submit
                                    </Button>
                                  </Grid>
                                </form> : <>
                    <Typography variant="subtitle1">Leave field blank to indicate no filter on that field.</Typography>
                        <form onSubmit={handleFormSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ThemeProvider theme={theme}>
                                        <Typography>
                                            <TextField
                                                label="Authors"
                                                variant="standard"
                                                fullWidth
                                                name="Authors"
                                                helperText="Separate authors with commas"
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
                                                helperText="Separate genres with commas"
                                            />
                                        </Typography>
                                    </ThemeProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <ThemeProvider theme={theme}>
                                        <Typography>
                                            <TextField
                                            label="Year Low"
                                            variant="standard"
                                            type="number"
                                            InputProps={{ inputProps: { min: 0 } }}
                                            fullWidth
                                            name="YearLow"
                                            helperText="Leave blank for no lower bound"
                                            />
                                        </Typography>
                                    </ThemeProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <ThemeProvider theme={theme}>
                                        <Typography>
                                            <TextField
                                            label="Year High"
                                            variant="standard"
                                            type="number"
                                            InputProps={{ inputProps: { min: 0 } }}
                                            fullWidth
                                            name="YearHigh"
                                            helperText="Leave blank for no upper bound"
                                            />
                                        </Typography>
                                    </ThemeProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <ThemeProvider theme={theme}>
                                        <Typography>
                                            <TextField
                                            label="Rating Low"
                                            variant="standard"
                                            type="number"
                                            InputProps={{ inputProps: { min: 0 } }}
                                            fullWidth
                                            name="RatingLow"
                                            helperText="Leave blank for no lower bound"
                                            />
                                        </Typography>
                                    </ThemeProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <ThemeProvider theme={theme}>
                                        <Typography>
                                            <TextField
                                            label="Rating High"
                                            variant="standard"
                                            type="number"
                                            InputProps={{ inputProps: { max: 5 } }}
                                            fullWidth
                                            name="RatingHigh"
                                            helperText="Leave blank for no upper bound"
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
                            </form> </> }
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
            <Button onClick={() => setPage(page => page === 0 ? 0 : page - 1)}>Previous Page</Button>
            <Button onClick={() => setPage(page => page + 1)}>Next Page</Button>
            {page + 1}
        </Box>
    )
}

export default BooksPage;