import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';

const validPurposes = ['books', 'authors'];

function FavoritesButton({ purpose, itemId }) {
  if (!validPurposes.includes(purpose)) {
    throw new Error(`Invalid purpose: ${purpose}`);
  }
  const [favorited, setFavorited] = useState(false);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/favorites/${purpose}/${itemId}/check`)
      .then((response) => response.json())
      .then((data) => setFavorited(data.favorited))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [purpose, itemId]);

  const addItem = () => {
    setLoading(true)
    const body = purpose === 'books' ? { isbn: itemId } : { authorId: itemId };
    fetch(`/api/favorites/${purpose}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then((data) => setFavorited(data.success))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const removeItem = () => {
    setLoading(true)
    const body = purpose === 'books' ? { isbn: itemId } : { authorId: itemId };
    fetch(`/api/favorites/${purpose}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then((data) => setFavorited(!data.success))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <Button 
        color={"primary"}
        variant="contained" 
        sx={{display: 'flex', alignItems: 'flex-start', height: '60px', width: '200px'}}>
        <CircularProgress sx={{ display: "flex", alignItems: "flex-start", height: "60px", width: "200px" }} />
      </Button>
    )
  }

  if (favorited) {
    return (
    <Button 
      onClick={removeItem} 
      color={"error"}
      variant="contained" 
      sx={{display: 'flex', alignItems: 'flex-start', height: '60px', width: '200px'}}>
      Remove from favorites
    </Button>
    )
  } else {
    return (
    <Button 
    onClick={addItem}  
    color={"success"}
    variant="contained" 
    sx={{display: 'flex', alignItems: 'flex-start', height: '60px', width: '200px'}}>
      Add to favorites
    </Button>
    )
  }
}

export default FavoritesButton;
