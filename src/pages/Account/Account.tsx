import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';

import paths from '@common/constants/paths';
import { openModal } from '@common/utils/eventEmitter';
import useAuthProvider from '@common/hooks/useAuthProvider';
import { AuthViews, ModalNames } from '@common/constants/enums';
import axiosInstance from '@services/dataProvider/axiosInstance';
import creteAsyncAction from '@services/stateProvider/creteAsyncAction';
import { useDispatch } from '@common/hooks/useStore';

const getAccountT = creteAsyncAction('account.getAccount', () =>
  axiosInstance.get('/account/getUserInformation'),
);

const Account = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthorized } = useAuthProvider('isAuthorized');

  const redirectIfNotAuthorized = useCallback(async () => {
    if (!isAuthorized && typeof isAuthorized === 'boolean') {
      await router.replace(paths.home);
      openModal(ModalNames.auth, { view: AuthViews.login }, 'sm');
    }
  }, [isAuthorized, router]);

  const getAccount = useCallback(async () => {
    await dispatch(getAccountT());
  }, [dispatch]);

  useEffect(() => {
    redirectIfNotAuthorized();
  }, [redirectIfNotAuthorized]);

  return (
    <div>
      <Button onClick={getAccount}>getAccount</Button>
    </div>
  );
};

export default Account;
