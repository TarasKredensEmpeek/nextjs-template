import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import paths from '@common/constants/paths';
import { openModal } from '@common/utils/eventEmitter';
import useAuthProvider from '@common/hooks/useAuthProvider';
import { AuthViews, ModalNames } from '@common/constants/enums';

const Account = () => {
  const router = useRouter();
  const { isAuthorized } = useAuthProvider('isAuthorized');

  const redirectIfNotAuthorized = useCallback(async () => {
    if (!isAuthorized) {
      await router.replace(paths.home);
      openModal(ModalNames.auth, { view: AuthViews.login }, undefined, 'sm');
    }
  }, [isAuthorized, router]);

  useEffect(() => {
    redirectIfNotAuthorized();
  }, [redirectIfNotAuthorized]);

  return <div>Account</div>;
};

export default Account;
