import React from 'react'
import { useParams } from 'react-router-dom';

function AuthorsPage() {
    let {id} = useParams();

    return (<div>
        {id ? (
            <div>Author with id: {id}</div>
        ) : (
            <div>All Authors</div>
        )}
        </div>
    )
}

export default AuthorsPage;