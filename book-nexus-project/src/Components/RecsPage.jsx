const RecsPage = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([])
  const [favoriteAuthors, setFavoriteAuthors] = useState([])

  useEffect(() => {
    fetch('/api/favorites') 
      .then((response) => response.json())
      .then((data) => { 
        setFavoriteBooks(data.books)
        setFavoriteAuthors(data.authors)
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <>
      {favoriteBooks.length ? (
        <BookRecommendations favoriteBooks={favoriteBooks} />
      ) : 
      <Typography variant="h4" component="h4" sx={{ textAlign: 'center' }}>
        You have no favorite books yet!
      </Typography>}
      {favoriteAuthors.length ? (
        <AuthorRecommendations favoriteAuthors={favoriteAuthors} />
      ) : 
      <Typography variant="h4" component="h4" sx={{ textAlign: 'center' }}>
        You have no favorite authors yet!
      </Typography>}
    </>
  )
}

export default RecsPage