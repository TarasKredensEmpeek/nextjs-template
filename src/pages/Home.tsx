import React from 'react';
import Button from '@mui/material/Button';

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

    <Button
      variant="text"
      color="secondary"
      onClick={() => openModal(ModalNames.auth, { view: AuthViews.login })}
    >
      login
    </Button>
  </>
);

export default Home;
