import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';

import Logo from '@common/components/logo';

interface AuthHeaderProps {
  onClose: () => void;
}

const AuthHeader: FC<AuthHeaderProps> = ({ onClose }) => (
  <Grid
    container
    height={70}
    bgcolor="background.dark"
    position="relative"
    alignItems="center"
    justifyContent="center"
  >
    <Logo text="general.onLocationLogo" />

    <Grid
      container
      alignItems="center"
      justifyContent="center"
      onClick={onClose}
      sx={{
        top: '30%',
        right: 20,
        width: 20,
        height: 20,
        color: 'white',
        cursor: 'pointer',
        position: 'absolute',
      }}
    >
      <CloseIcon fontSize="medium" sx={{ fontSize: 24 }} />
    </Grid>
  </Grid>
);

export default AuthHeader;
