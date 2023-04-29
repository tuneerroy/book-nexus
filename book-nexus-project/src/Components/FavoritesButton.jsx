import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

const validPurposes = ['books', 'authors'];

function FavoritesButton({ purpose, itemId }) {
  if (!validPurposes.includes(purpose)) {
    throw new Error(`Invalid purpose: ${purpose}`);
  }
  
  const [checked, setChecked] = useState(false);  

  useEffect(() => {
    fetch(`/api/favorites/${purpose}/${itemId}/check`)
      .then((response) => response.json())
      .then((data) => setChecked(data.checked))
      .catch((error) => console.error(error));
  }, [purpose, itemId]);

  const addItem = () => {
    const body = purpose === 'books' ? { isbn: itemId } : { authorId: itemId };
    fetch(`/api/favorites/${purpose}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then((data) => setChecked(data.success))
      .catch((error) => console.error(error));
  };

  const removeItem = () => {
    const body = purpose === 'books' ? { isbn: itemId } : { authorId: itemId };
    fetch(`/api/favorites/${purpose}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then((data) => setChecked(!data.success))
      .catch((error) => console.error(error));
  };

  if (checked) {
    return <Button onClick={removeItem}>Remove from favorites</Button>;
  } else {
    return <Button onClick={addItem}>Add to favorites</Button>;
  }
}

export default FavoritesButton;
