import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

function Book() {
    let {id: isbn} = useParams();

    const [book, setBook] = useState([]);

    useEffect(() => {
        fetch(`/api/books/${isbn}`)
            .then(res => res.json())
            .then(data => {
                setBook(data)
                console.log(data)
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 3}}>
            <Typography variant="h3">{book.title}</Typography>
            <img
                src={book.image_link}
                alt={'Not found'}
        />
            <Box sx={{display: 'block'}}>
                <b>Year:</b> {book.year}, <b>Authors:</b> {book.authors}, <b>Genres:</b> {book.categories}, <b>isbn:</b> {book.isbn}
                <br></br>
                <b>Description: </b>{book.description}
            </Box>

            <NavLink to={`../books`}>Return</NavLink>
        </Box>
    )
}

export default Book;