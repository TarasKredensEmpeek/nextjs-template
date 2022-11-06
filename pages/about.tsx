import React from 'react';
import Button from '@mui/material/Button';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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

interface SSRProps {
  locale: string;
}

export async function getServerSideProps({ locale }: SSRProps) {
  const props = {
    ...(await serverSideTranslations(locale)),
  };

  return { props };
}

export default About;
