import axios from 'axios';

export const getBooks = async ({categories, authors, year_low, year_high, rating_low, rating_high, pageSize, page}) => {
  try {
    const response = await axios.get(`/api/books`, {
      params: { categories, authors, year_low, year_high, rating_low, rating_high, pageSize, page }
    });
    console.log(response.data);
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
    console.log(response.data);
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}
