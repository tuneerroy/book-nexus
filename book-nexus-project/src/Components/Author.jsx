import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

function Author(props) {
    const {
        id, name
    } = props;

    return (
        <Card sx={{ width: '345px' }}>        
        <CardContent sx={{display: 'flex', justifyContent: 'end', flexDirection: 'column'}}>
          <Typography gutterBottom variant="h5" component="div" sx={{textAlign: 'center'}}>
            {name}
          </Typography>
        </CardContent>
      </Card>
    )
}

export default Author;