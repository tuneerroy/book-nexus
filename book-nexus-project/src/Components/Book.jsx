import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    )
}

export default Book;