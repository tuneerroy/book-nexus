import axios from "axios";

export const getBooks = async ({
  categories,
  authors,
  year_low,
  year_high,
  rating_low,
  rating_high,
  pageSize,
  page,
}) => {
  try {
    const response = await axios.get(`/api/books`, {
      params: {
        categories,
        authors,
        year_low,
        year_high,
        rating_low,
        rating_high,
        pageSize,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBook = async (isbn) => {
  try {
    const response = await axios.get(`/api/books/${isbn}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAuthor = async (id) => {
  try {
    const response = await axios.get(`/api/authors/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchBooks = async (keywords) => {
  try {
    const response = await axios.get(`/api/books/search/`, {
      params: { keywords },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const getBookReviews = async (isbn, pageSize, page) => {
  try {
    const response = await axios.get(
      `/api/reviews/books/${isbn}?page=${page}&pageSize=${pageSize}`
    )
    console.error(response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }
};

export const getAuthorReviews = async (authorId, pageSize, page) => {
  try {
    const response = await axios.get(`/api/reviews/authors/${authorId}?page=${page}&pageSize=${pageSize}`);
    console.error(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

