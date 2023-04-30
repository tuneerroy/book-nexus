import React, { useState, useEffect } from "react";
import BookRecs from "./BookRecs";
import AuthorRecs from "./AuthorRecs";
import CategoryRecs from "./CategoryRecs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const RecsPage = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [favoriteAuthors, setFavoriteAuthors] = useState([]);

  useEffect(() => {
    fetch("/api/favorites")
      .then((response) => response.json())
      .then((data) => {
        setFavoriteBooks(data.books);
        setFavoriteAuthors(data.authors);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {favoriteBooks.length ? (
        <BookRecs favoriteBooks={favoriteBooks} />
      ) : (
        <Typography variant="h4" component="h4" sx={{ textAlign: "center" }}>
          You have no favorite books yet!
        </Typography>
      )}
      {favoriteAuthors.length ? (
        <AuthorRecs favoriteAuthors={favoriteAuthors} />
      ) : (
        <Typography
          variant="h4"
          component="h4"
          sx={{ textAlign: "center", mt: "1em" }}
        >
          You have no favorite authors yet!
        </Typography>
      )}
      <Box sx={{ marginBottom: 10 }}>
        <CategoryRecs />
      </Box>
    </>
  );
};

export default RecsPage;
