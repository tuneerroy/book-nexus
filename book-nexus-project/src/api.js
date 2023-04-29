import axios from 'axios';

export const getBooks = async ({categories, authors, year_low, year_high, rating_low, rating_high, pageSize, page}) => {
  try {
    const response = await axios.get(`/api/books`, {
      params: { categories, authors, year_low, year_high, rating_low, rating_high, pageSize, page }
    });
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}

export const getBook = async (isbn) => {
  try {
    const response = await axios.get(`/api/books/${isbn}`);
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}

export const getAuthor = async (id) => {
  try {
    const response = await axios.get(`/api/authors/${id}`);
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}

export const searchBooks = async (e) => {
  try {
    e.preventDefault();
    const title = e.target.Title.value;
    const authors = e.target.Authors.value.split(",")
    const genres = e.target.Genres.value.split(",")
    const year = e.target.Year.value;

    const keywords = [title, ...authors, ...genres, year]

    const response = await axios.get(`/api/books/search/`, {
      params: {keywords}
    });
    console.log(response.data)
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}
