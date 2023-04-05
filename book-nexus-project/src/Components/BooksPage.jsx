import React from 'react'
import { useParams } from 'react-router-dom';

function BooksPage() {
    let {id} = useParams();

    return (<div>
        {id ? (
            <div>Book with id: {id}</div>
        ) : (
            <div>All Books</div>
        )}
        </div>
    )
}

export default BooksPage;