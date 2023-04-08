import React from 'react'
import { useParams } from 'react-router-dom';

function Book(props) {
    let {id} = useParams();

    return (
        <div>Book with id: {id}</div>
    )
}

export default Book;