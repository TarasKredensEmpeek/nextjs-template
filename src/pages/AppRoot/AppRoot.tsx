import React from 'react';

import Header from '@common/components/Header/Header';
import ModalHandler from '@common/modules/ModalHandler';

const AppRoot = () => (
  <div style={{ position: 'relative' }}>
    <Header />
    <ModalHandler />
  </div>
);

export default AppRoot;
