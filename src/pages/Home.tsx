import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Home = () => {
  return (
    <>
      <Typography color="hint">text</Typography>
      <Button color="primary" variant="outlined">
        text
      </Button>

      <Button color="primary" variant="contained">
        text
      </Button>

      <Button color="primary" variant="text">
        text
      </Button>
    </>
  );
};

export default Home;
