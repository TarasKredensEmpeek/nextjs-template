import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Home = () => {
  return (
    <>
      <Button variant="circle">I</Button>
      <Button variant="outlined">I</Button>
      <Button variant="contained">I</Button>
      <Button variant="rounded">sdfsfsd fsdf sdfsd I</Button>

      <Typography color="hint">text</Typography>
      <TextField
        color="secondary"
        variant="outlined"
        placeholder="outlined"
        size="small"
        required
      />

      <TextField
        color="secondary"
        variant="filled"
        placeholder="filled"
        size="small"
      />

      <TextField
        color="secondary"
        variant="standard"
        size="small"
        placeholder="standard"
      />
    </>
  );
};

export default Home;
