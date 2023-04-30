import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import './styles.css'

function Book({isbn, title, image_link}) {
    const handleImageLoad = (e) => {
      if (e.target.naturalWidth === 1 && e.target.naturalHeight === 1) {
        e.target.src = 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg';
      }
    }

    return (
        <Card sx={{ width: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '10px' }}>
        <img
                className="min-w-[160px] bookImage"
                src={image_link}
                alt={title}
                title={title}
                onLoad={handleImageLoad}
        />
        <CardContent sx={{display: 'flex', justifyContent: 'end', flexDirection: 'column'}}>
          <Typography gutterBottom variant="h6" component="div" sx={{textAlign: 'center'}}>
            {title}
          </Typography>
        </CardContent>
        <CardActions sx={{display: 'flex', justifyContent: 'center', padding: 2}}>
          <NavLink to={`${isbn}`}><Box sx={{color: '#1d3557', fontWeight: 600}}>Learn More</Box></NavLink>
        </CardActions>
      </Card>
    )
}

export default Book;