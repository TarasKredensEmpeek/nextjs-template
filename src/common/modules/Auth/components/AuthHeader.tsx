import React, { FC } from 'react';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';

interface AuthHeaderProps {
  logoUrl?: string;
  onClose: () => void;
}

const AuthHeader: FC<AuthHeaderProps> = ({
  onClose,
  logoUrl = '/assets/images/logo.png',
}) => (
  <Grid
    container
    alignItems="center"
    justifyContent="center"
    position="relative"
    bgcolor="background.dark"
    height={70}
  >
    <Image src={logoUrl} layout="fixed" width="210" height="35" alt="logo" />

    <Grid
      container
      alignItems="center"
      justifyContent="center"
      onClick={onClose}
      sx={{
        right: 10,
        width: 20,
        height: 20,
        color: 'white',
        cursor: 'pointer',
        position: 'absolute',
        borderRadius: '50%',
      }}
    >
      <CloseIcon fontSize="medium" sx={{ fontSize: 14 }} />
    </Grid>
  </Grid>
);

export default AuthHeader;
