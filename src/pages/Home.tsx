import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import eventEmitter from '@services/eventEmitter';
import { EventNames, ModalNames } from '@common/constants/enums';

const Home = () => (
  <>
    <Button variant="circle">I</Button>
    <Button variant="outlined">I</Button>
    <Button variant="contained">I</Button>
    <Button
      variant="rounded"
      onClick={() =>
        eventEmitter.emit(EventNames.openModal, { name: ModalNames.auth })
      }
    >
      open modal
    </Button>

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

export default Home;
