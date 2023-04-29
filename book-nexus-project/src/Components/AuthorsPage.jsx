import React, { useEffect, useState } from 'react'
import Author from './Author'
import './styles.css'
import Grid from '@mui/material/Grid';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from '@mui/material';
import Paper from '@mui/material/Paper';

const authors = [{id: 1, name: 'uno'}, {id: 2, name: 'dos'}]

function AuthorsPage() {

    // const [authors, setAuthors] = useState([]);

    //TODO
    // useEffect(() => {
    //     fetch('/api/recommendations/authorList')
    //         .then(res => res.json())
    //         .then(data => {
    //             setAuthors(data)
    //         })
    //         .catch(err => console.log(err))
    // }, []);

                /*{ <Grid container spacing={2}>
            {
                authors.map(({
                    id, name
                }) => (
                    <Grid item xs={4} sx={{display:'flex', justifyContent:'center', py: 5}}> 
                        <Author
                            id={id}
                            name={name}
                            />
                    </Grid>
                ))
            }
            </Grid> }*/

    return (
        <div className='bookFeed authorTable'>
            <TableContainer component={Paper} sx={{maxWidth: '50%'}}>
                <Table sx={{}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Ranking</TableCell>
                            <TableCell align="left">Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {authors.map((author) => (
                        <TableRow
                        key={author.name}
                        sx={{ }}
                        >
                            <TableCell align="left">{author.id}</TableCell>
                            <TableCell align="left">{author.name}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default AuthorsPage;