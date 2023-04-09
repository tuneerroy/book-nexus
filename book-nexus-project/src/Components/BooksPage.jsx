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

    const theme = createTheme({
        typography: {
        //   fontFamily: 'Times New Roman, Arial',
        //   htmlFontSize: '12',
        }
      });

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
                        <form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ThemeProvider theme={theme}>
                                        <Typography>
                                            <TextField
                                                label="Title"
                                                variant="standard"
                                                fullWidth
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