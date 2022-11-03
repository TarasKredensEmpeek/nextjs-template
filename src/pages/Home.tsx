import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import { openModal } from '@common/utils/eventEmitter';
import { AuthViews, ModalNames } from '@common/constants/enums';

const Home = () => (
  <>
    <Button
      variant="outlined"
      onClick={() => openModal(ModalNames.auth, { view: AuthViews.login })}
    >
      login
    </Button>

    <Grid container>
      <TextField size="small" variant="outlined" placeholder="outlined" />

      <TextField error size="small" variant="outlined" placeholder="outlined" />

      <TextField
        disabled
        size="small"
        variant="outlined"
        placeholder="outlined"
      />
    </Grid>

    <Grid container>
      <TextField size="small" variant="filled" placeholder="outlined" />

      <TextField error size="small" variant="filled" placeholder="outlined" />

      <TextField
        disabled
        size="small"
        variant="filled"
        placeholder="outlined"
      />
    </Grid>
  </>
);

export default Home;
