import React, { FC } from 'react';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';

import Logo from '@common/components/logo';

import { sideLinks } from './constants';

interface LinkTypographyProps {
  name: string;
  onClick?: () => void;
}

const LinkTypography: FC<LinkTypographyProps> = ({ name, onClick }) => (
  <Typography
    onClick={onClick}
    variant="subtitle1"
    sx={{
      cursor: 'pointer',
      transition: 'color .3s ease 0s',
      '&:hover': { color: 'primary.main' },
    }}
  >
    {name}
  </Typography>
);

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    width: '50%',
    border: 'none',
    backgroundColor: theme.palette.background.dark,

    [theme.breakpoints.down(900)]: {
      width: '85%',
    },

    [theme.breakpoints.down(400)]: {
      width: '90%',
    },
  },
}));

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
}

const SideMenu: FC<SideMenuProps> = ({ open, onClose }) => {
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

      <Grid container color="text.light" px={5} pt={1.2}>
        {sideLinks.map(link => (
          <Grid item container key={link.url}>
            <Grid item container py={1}>
              {link.external ? (
                <LinkTypography name={link.name} />
              ) : (
                <Link href={link.url}>
                  <LinkTypography name={link.name} />
                </Link>
              )}
            </Grid>

            {link.dividerAfter && (
              <Grid item container py={3}>
                <Divider
                  color="divider"
                  variant="fullWidth"
                  sx={{ height: 1, width: '100%' }}
                />
              </Grid>
            )}
          </Grid>
        ))}

        <Grid item container py={3}>
          <Divider variant="fullWidth" sx={{ height: 1, width: '100%' }} />
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default SideMenu;
