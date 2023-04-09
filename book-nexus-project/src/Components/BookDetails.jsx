import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';

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
        <div>Book with id: {isbn} and title: {book.title} and description: {book.description}</div>
    )
}

export default Book;