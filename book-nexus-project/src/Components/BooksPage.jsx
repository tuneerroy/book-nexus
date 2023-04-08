import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getBooks } from '../api';

function BooksPage() {
    let {id} = useParams();

    // for testing
    // useEffect(() => {
    //   getBooks(['Fiction'], [], 2000, 2003, 2, 4).then((data) => {
    //     console.log(data);
    //   });
    // }, []);

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