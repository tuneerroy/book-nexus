import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

function Book(props) {
    const {
        isbn, title, year, description, image_link
    } = props;

    return (
        <Card sx={{ width: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
        <CardMedia
                sx={{ minHeight: '140px', maxHeight: '500px', objectFit: 'contain', backgroundColor: 'black' }}
                image={image_link}
                title={title}
                component="img"
        />
        <CardContent sx={{display: 'flex', justifyContent: 'end', flexDirection: 'column'}}>
          <Typography gutterBottom variant="h6" component="div" sx={{textAlign: 'center'}}>
            {title}
          </Typography>
        </CardContent>
        <CardActions sx={{display: 'flex', justifyContent: 'center', padding: 2}}>
          <NavLink to={`${isbn}`}>Learn More</NavLink>
        </CardActions>
      </Card>
    )
}

export default Book;