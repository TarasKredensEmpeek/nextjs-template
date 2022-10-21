import React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import useTheme from '@mui/material/styles/useTheme';

const Home = () => {
  // console.log(useTheme().palette);
  return (
    <>
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
