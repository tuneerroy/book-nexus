import React, { useState } from 'react'
import Shelf from './Shelf'
import { Alert, Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material'

const CategoryRecs = () => {
  const [includeGenres, setIncludeGenres] = useState("");
  const [excludeGenres, setExcludeGenres] = useState("");
  const [andMode, setAndMode] = useState(false);

  const [getAuthors, setGetAuthors] = useState(null);
  const [warning, setWarning] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    setWarning(false);
    const included = includeGenres.split(",").map((genre) => genre.trim());
    const excluded = excludeGenres.split(",").map((genre) => genre.trim());
    if (included.some((genre) => excluded.includes(genre))) {
      setWarning(true);
      return;
    }

    setGetAuthors(() => async ({pageSize, page}) => {
      try {
        const response = await fetch(`/api/authors/recommendations/category?including=${included.join(',')}&excluding=${excluded.join(',')}&andMode=${andMode}&pageSize=${pageSize}&page=${page}`)
        return await response.json()
      } catch (error) {
        console.error(error)
      }
    })
  };
  
  return (
    <div style={{paddingTop: 100, maxWidth: 1000, margin: "auto"}}>
      <form onSubmit={handleSubmit}>
        {warning && <Alert severity="warning">Can't overlap included and excluded genres!</Alert>}
        <Box display="flex" flexDirection="column">
          <TextField
            label="Genres to include"
            value={includeGenres}
            onChange={(event) => setIncludeGenres(event.target.value)}
          />
          <TextField
            label="Genres to exclude"
            value={excludeGenres}
            onChange={(event) => setExcludeGenres(event.target.value)}
          />
          <FormControlLabel
            control={<Checkbox checked={andMode} onChange={() => setAndMode(!andMode)} />}
            label="Strictly Match"
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
      {getAuthors && <Shelf title={"Author Recommendations"} getItems={getAuthors} purpose={"authors"} />}
    </div>
  )
}

export default CategoryRecs
