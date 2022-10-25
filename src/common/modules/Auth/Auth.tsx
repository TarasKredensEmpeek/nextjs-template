import React, { FC, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';

import { AuthViews } from '@common/constants/enums';

import Login from './Login';
import { AuthHeader } from './components';
import CreateAccount from './CreateAccount';

interface AuthProps {
  view?: AuthViews;
  onClose: () => void;
}

const authTitles = {
  [AuthViews.login]: 'login',
  [AuthViews.createAccount]: 'createAccount',
  [AuthViews.forgotPassword]: 'forgotPassword',
};

const Auth: FC<AuthProps> = ({ onClose, view = AuthViews.login }) => {
  const { t } = useTranslation(['auth']);

  const title = useMemo(() => authTitles[view], [view]);

  return (
    <Grid container maxWidth={480} direction="column" alignItems="center">
      <AuthHeader onClose={onClose} />

      <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>
        {t(title)}
      </Typography>

      {
        {
          [AuthViews.login]: <Login />,
          [AuthViews.createAccount]: <CreateAccount />,
          [AuthViews.forgotPassword]: null,
        }[view]
      }
    </Grid>
  );
};

export default Auth;
