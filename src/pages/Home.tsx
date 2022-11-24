import React, { useState } from 'react';

import { Button } from '@common/components/buttons';
import Accordion from '@common/components/Accordion';
import { openModal } from '@common/utils/eventEmitter';
import { AuthViews, ModalNames } from '@common/constants/enums';

const data = [
  {
    name: 'step 1 step 1 step 1 step 1 step 1 step 1 step 1 step 1',
    content: 'content step 1',
  },
  {
    name: 'step 2',
    content: 'content step 2',
  },
  {
    name: 'step 3',
    content: 'content step 3',
  },
];

const Home = () => {
  const [act, setAct] = useState<number | undefined>(undefined);

  const toggle = (i: number) => setAct(a => (a === i ? undefined : i));

  return (
    <>
      <Button
        variant="outlined"
        onClick={() =>
          openModal(ModalNames.auth, { view: AuthViews.login }, undefined, 'sm')
        }
      >
        login
      </Button>

      <div style={{ width: 500 }}>
        <Accordion items={data} handleExpand={toggle} expandedItemId={act} />
      </div>
    </>
  );
};

export default Home;
