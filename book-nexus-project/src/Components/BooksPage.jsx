import React, { useState, useEffect } from "react";
import Book from "./Book";
import "./styles.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { searchBooks, getBooks } from "../api";
import { CircularProgress } from "@mui/material";

function BooksPage() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch("/api/books/random")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const authors =
      e.target.Authors.value.length === 0
        ? undefined
        : e.target.Authors.value.split(",").map((author) => author.trim());
    const categories =
      e.target.Genres.value.length === 0
        ? undefined
        : e.target.Genres.value.split(",").map((category) => category.trim());
    const year_low =
      e.target.YearLow.value.length === 0 ? undefined : e.target.YearLow.value;
    const year_high =
      e.target.YearHigh.value.length === 0
        ? undefined
        : e.target.YearHigh.value;
    const rating_low =
      e.target.RatingLow.value.length === 0
        ? undefined
        : e.target.RatingLow.value;
    const rating_high =
      e.target.RatingHigh.value.length === 0
        ? undefined
        : e.target.RatingHigh.value;

    const res = await getBooks({
      authors,
      categories,
      year_low,
      year_high,
      rating_low,
      rating_high,
    });
    setBooks(res);
    setPage(0);
    setLoading(false);
  };

  const handleKeywordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const keywords = e.target.search.value.split(" ");
    const res = await searchBooks(keywords);
    setBooks(res);
    setPage(0);
    setLoading(false);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box
      className="bookFeed"
      sx={{ marginBottom: 2, width: "90%", marginX: "auto" }}
    >
      <Box sx={{ width: "75%", marginX: "auto" }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">Search Books</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Switch
              helpertext="test"
              checked={checked}
              onChange={() => setChecked((c) => !c)}
              // inputProps={{ 'aria-label': 'controlled' }}
            />
            <Typography variant="">Search by keyword</Typography>
            {checked ? (
              <form onSubmit={handleKeywordSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>
                      <TextField
                        label="Search by keyword"
                        variant="standard"
                        fullWidth
                        name="search"
                      />
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ marginTop: 1 }}>
                  <Button variant="contained" color="info" type="submit">
                    Submit
                  </Button>
                </Grid>
              </form>
            ) : (
              <>
                <Typography variant="subtitle1">
                  Leave field blank to indicate no filter on that field.
                </Typography>
                <form onSubmit={handleFormSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography>
                        <TextField
                          label="Authors"
                          variant="standard"
                          fullWidth
                          name="Authors"
                          helperText="Separate authors with commas"
                        />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <TextField
                          label="Genres"
                          variant="standard"
                          fullWidth
                          name="Genres"
                          helperText="Separate genres with commas"
                        />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <TextField
                          label="Year Low"
                          variant="standard"
                          type="number"
                          InputProps={{ inputProps: { min: 0 } }}
                          fullWidth
                          name="YearLow"
                          helperText="Leave blank for no lower bound"
                        />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <TextField
                          label="Year High"
                          variant="standard"
                          type="number"
                          InputProps={{ inputProps: { min: 0 } }}
                          fullWidth
                          name="YearHigh"
                          helperText="Leave blank for no upper bound"
                        />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <TextField
                          label="Rating Low"
                          variant="standard"
                          type="number"
                          InputProps={{ inputProps: { min: 0 } }}
                          fullWidth
                          name="RatingLow"
                          helperText="Leave blank for no lower bound"
                        />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <TextField
                          label="Rating High"
                          variant="standard"
                          type="number"
                          InputProps={{ inputProps: { max: 5 } }}
                          fullWidth
                          name="RatingHigh"
                          helperText="Leave blank for no upper bound"
                        />
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: 1 }}>
                      <Button variant="contained" color="info" type="submit">
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>{" "}
              </>
            )}
          </AccordionDetails>
        </Accordion>
      </Box>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {books &&
          books
            .slice(page * 12, (page + 1) * 12)
            .map(({ isbn, title, year, description, image_link }) => (
              <Grid
                item
                xs={4}
                sx={{ display: "flex", justifyContent: "center", py: 5 }}
              >
                <Book
                  isbn={isbn}
                  title={title}
                  year={year}
                  description={description}
                  image_link={image_link}
                />
              </Grid>
            ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <Button
          variant="contained"
          sx={{ width: "100px", backgroundColor: "#457b9d" }}
          onClick={() => page > 0 && setPage(page => page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          sx={{ width: "100px", backgroundColor: "#457b9d" }}
          onClick={() => setPage(page => page + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default BooksPage;
