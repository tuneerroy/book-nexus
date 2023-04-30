import React from "react";
import Shelf from "./Shelf";

function HomePage() {
  const getFavoriteBooks = async ({ pageSize, page }) => {
    try {
      const favBooks = await fetch("/api/favorites/books");
      const favBooksJson = await favBooks.json();

      if (!favBooksJson.books.length) return [];

      const books = await fetch(
        `/api/books/details?isbns=${favBooksJson.books.join(
          ","
        )}&pageSize=${pageSize}&page=${page}`
      );
      const booksJson = await books.json();

      return booksJson;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const getFavoriteAuthors = async ({ pageSize, page }) => {
    try {
      const favAuthors = await fetch("/api/favorites/authors");
      const favAuthorsJson = await favAuthors.json();

      if (!favAuthorsJson.authors.length) return [];

      const authors = await fetch(
        `/api/authors/details?ids=${favAuthorsJson.authors.join(
          ","
        )}&pageSize=${pageSize}&page=${page}`
      );
      const authorsJson = await authors.json();

      return authorsJson;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  return (
    <div className="px-20">
      <Shelf
        title={"Favorite Books"}
        purpose={"books"}
        getItems={getFavoriteBooks}
      />
      <br />
      <Shelf
        title={"Favorite Authors"}
        purpose={"authors"}
        getItems={getFavoriteAuthors}
      />
    </div>
  );
}

export default HomePage;
