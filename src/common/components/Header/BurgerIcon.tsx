import React from 'react';
import clsx from 'clsx';
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(
  {
    container: {
      width: 20,
      height: 9,
      cursor: 'pointer',
      position: 'relative',
      transform: 'rotate(0deg)',
      transition: '.5s ease-in-out',
      zIndex: 100001,

      '& div': {
        display: 'block',
        left: '0',
        height: 2,
        width: '100%',
        opacity: '1',
        position: 'absolute',
        borderRadius: '9px',
        transition: '.25s ease-in-out',
      },
    },

    firstItem: {
      top: 0,
    },
    lastItem: {
      top: 7,
    },

    firstItemOpen: {
      top: 4.5,
      transform: 'rotate(140deg)',
    },
    lastItemOpen: {
      top: 4.5,
      transform: 'rotate(-140deg)',
    },
  },
  { name: 'MuiBurgerIcon' },
);

const BurgerIcon = ({
  open,
  onClick,
}: {
  open?: boolean;
  onClick: () => void;
}) => {
  const styles = useStyles();
  const color = open ? 'background.default' : 'background.dark';

  return (
    <Grid container className={styles.container} onClick={onClick}>
      <Grid
        item
        bgcolor={color}
        className={clsx(styles.firstItem, { [styles.firstItemOpen]: open })}
      />

      <Grid
        item
        bgcolor={color}
        className={clsx(styles.lastItem, { [styles.lastItemOpen]: open })}
      />
    </Grid>
  );
};

export default BurgerIcon;
