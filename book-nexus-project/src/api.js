import axios from 'axios';

const root = 'http://localhost:8000';

export const getBooks = async (categories, authors, year_low, year_high, rating_low, rating_high) => {
  try {
    const response = await axios.get(`${root}/books`, {
      params: { categories, authors, year_low, year_high, rating_low, rating_high }
    });
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}

