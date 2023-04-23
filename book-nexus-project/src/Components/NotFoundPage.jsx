import React from 'react';
import { Box, Typography } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Box>
      <Typography variant="h1" color="text.primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="text.secondary" component="h2" gutterBottom>
        Page Not Found
      </Typography>
    </Box>
  )
}

export default NotFoundPage;