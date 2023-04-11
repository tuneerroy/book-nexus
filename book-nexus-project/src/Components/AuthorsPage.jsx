import React, { useEffect, useState } from 'react'
import Author from './Author'
import './styles.css'
import Grid from '@mui/material/Grid';


function AuthorsPage() {

    const [authors, setAuthors] = useState([]);

    //TODO
    useEffect(() => {
        // fetch('/api/favorites/books')
        fetch('/api/authors')
            .then(res => res.json())
            .then(data => {
                setAuthors(data)
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <div className='bookFeed'>
            <Grid container spacing={2}>
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
            </Grid>
        </div>
    )
}

export default AuthorsPage;