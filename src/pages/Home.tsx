import React from 'react';

import { Button } from '@common/components/buttons';
import { openModal } from '@common/utils/eventEmitter';
import { AuthViews, ModalNames } from '@common/constants/enums';

// const options = [
//   {
//     value: 'value for select 1',
//     label: 'value for select 1',
//   },
//   {
//     value: 'value for select 2',
//     label: 'value for select 2',
//   },
// ];

const Home = () => (
  <>
    <Button
      variant="outlined"
      onClick={() =>
        openModal(ModalNames.auth, { view: AuthViews.login }, undefined, 'sm')
      }
    >
      login
    </Button>
  </>
);

export default Home;
