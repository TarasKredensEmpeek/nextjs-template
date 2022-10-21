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
        value=""
        placeholder="outlined"
        size="small"
      />

      <TextField
        color="secondary"
        variant="filled"
        value="filled"
        placeholder="filled"
        size="small"
      />

      <TextField
        color="secondary"
        variant="standard"
        value="standard"
        size="small"
        placeholder="standard"
      />
    </>
  );
};

export default Home;
