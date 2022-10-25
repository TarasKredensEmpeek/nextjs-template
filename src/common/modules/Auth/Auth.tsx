import React, { FC } from 'react';
import Grid from '@mui/material/Grid';

import { AuthViews } from '@common/constants/enums';

import Login from './Login';
import CreateAccount from './CreateAccount';

interface AuthProps {
  view?: AuthViews;
}

const Auth: FC<AuthProps> = ({ view = AuthViews.login }) => (
  <Grid maxWidth={480}>
    {
      {
        [AuthViews.login]: <Login />,
        [AuthViews.createAccount]: <CreateAccount />,
        [AuthViews.forgotPassword]: null,
      }[view]
    }
  </Grid>
);

export default Auth;
