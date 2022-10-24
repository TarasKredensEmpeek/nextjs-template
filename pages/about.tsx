import React from 'react';
import Button from '@mui/material/Button';

import eventEmitter from '@services/eventEmitter';
import { EventNames, ModalNames } from '@common/constants/enums';

const About = () => (
  <div>
    about.tsx
    <Button
      variant="rounded"
      onClick={() =>
        eventEmitter.emit(EventNames.openModal, { name: ModalNames.auth })
      }
    >
      open modal
    </Button>
  </div>
);

export default About;
