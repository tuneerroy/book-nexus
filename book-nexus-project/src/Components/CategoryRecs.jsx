import React, { useState } from 'react'
import Shelf from './Shelf'
import { Alert, Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'

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
    <div style={{paddingTop: 100, maxWidth: 1200, margin: "auto"}}>
      <Box sx={{maxWidth: 600, margin: 'auto'}}>
        <Typography variant='h5' sx={{textAlign: 'left'}}>Filter Genres</Typography>
        <Typography variant='h7' sx={{textAlign: 'left'}}>
          Include or exclude any genres from your personalized recommendations by listing them below.
        </Typography>
        <form onSubmit={handleSubmit}>
          {warning && <Alert severity="warning">Can't overlap included and excluded genres!</Alert>}
          <Box display="flex" flexDirection="column">
            <TextField
              label="Genres to include"
              value={includeGenres}
              onChange={(event) => setIncludeGenres(event.target.value)}
              sx={{marginTop: 2, marginBottom: 1}}
            />
            <TextField
              label="Genres to exclude"
              value={excludeGenres}
              onChange={(event) => setExcludeGenres(event.target.value)}
              sx={{marginBottom: 1}}
            />
            <FormControlLabel
              control={<Checkbox checked={andMode} onChange={() => setAndMode(!andMode)} />}
              label="Strictly Match"
            />
            <Button type="submit" variant="contained" sx={{backgroundColor: '#0096c7', marginBottom: 3}}>
              Filter
            </Button>
          </Box>
        </form>
      </Box>
      {getAuthors && <Shelf title={"Author Recommendations"} getItems={getAuthors} purpose={"authors"}/>}
    </div>
  )
}

export default CategoryRecs
