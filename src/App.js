import * as React from 'react';
import Box from '@mui/material/Box';
import MyToolbar from './components/MyToolbar/MyToolbar';
import Grid from '@mui/material/Grid';
import MyContent from './components/MyContent/MyContent';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>

      <MyToolbar />

      <Grid
        container
        justifyContent="center"
      >
        <Grid
          item
          xs={12}
          sm={10}
          md={6}
          padding={2}
        >
          <MyContent />
        </Grid>
      </Grid>

    </Box>
  );
}
