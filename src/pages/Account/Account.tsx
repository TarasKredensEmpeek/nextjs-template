import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

import paths from '@common/constants/paths';
import { openModal } from '@common/utils/eventEmitter';
import useAuthProvider from '@common/hooks/useAuthProvider';
import { AuthViews, ModalNames } from '@common/constants/enums';
import useStore from '@common/hooks/useStore';
import { Button } from '@common/components/buttons';
import { updateAccount } from '@store/account';

const Account = () => {
  const router = useRouter();
  const { state, dispatch } = useStore();
  const { isAuthorized } = useAuthProvider('isAuthorized');

  const redirectIfNotAuthorized = useCallback(async () => {
    if (!isAuthorized && typeof isAuthorized === 'boolean') {
      await router.replace(paths.home);
      openModal(ModalNames.auth, { view: AuthViews.login }, 'sm');
    }
  }, [isAuthorized, router]);

  useEffect(() => {
    redirectIfNotAuthorized();
  }, [redirectIfNotAuthorized]);

  return (
    <div>
      Account
      <Button
        title="update account"
        onClick={() => dispatch(updateAccount(state?.accountInfo))}
      />
    </div>
  );
};

export default Account;
