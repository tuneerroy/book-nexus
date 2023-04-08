import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

function Book(props) {
    const {
        isbn, title, year, description, image_link
    } = props;

    return (
        <Card sx={{ width: 345 }}>
        <CardMedia
                sx={{ height: 140 }}
                image={image_link}
                title={title}
        />
        
        <CardContent sx={{display: 'flex', justifyContent: 'end', flexDirection: 'column'}}>
          <Typography gutterBottom variant="h5" component="div" sx={{textAlign: 'center'}}>
            {title}
          </Typography>
        </CardContent>
        <CardActions sx={{display: 'flex', justifyContent: 'center', padding: 0}}>
          {/* <Button size="small">Learn More</Button> */}
          <NavLink to={`books/${isbn}`}>Learn More</NavLink>
        </CardActions>
      </Card>
    )
}

export default Book;