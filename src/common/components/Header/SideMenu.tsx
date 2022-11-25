import React from 'react';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

import Logo from '@common/components/logo';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    width: '50vw',
    border: 'none',
    backgroundColor: theme.palette.background.dark,
  },
}));

const SideMenu = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const classes = useStyles();

  return (
    <Drawer
      open={open}
      onClose={onClose}
      classes={classes}
      transitionDuration={700}
    >
      <Grid container mt={2} justifyContent="center">
        <Logo fontSize="1.8em" />
      </Grid>
    </Drawer>
  );
};

export default SideMenu;
