import React, { useEffect } from 'react'

function MainPage() {
    useEffect(() => {
        // test route
        fetch('/api/books/test')
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err))
    }, []);


    return <div className='mainPage'>
        <div className='mainPageText'>
            Welcome
        </div>
    </div>
}

export default MainPage;