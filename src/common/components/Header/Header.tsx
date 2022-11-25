import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';

import { isBrowser } from '@common/utils/ssrHelpers';

import Logo from '../logo';
import SideMenu from './SideMenu';
import BurgerIcon from './BurgerIcon';
import { headerLinks } from './constants';

const headerHeight = 75;
let lastScrollTop = 0;
const defaultScrollParams = {
  isScrollDown: false,
  isTop: true,
};

const menuWrapperSx = {
  display: 'flex',
  alignItems: 'center',
};

const Header = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isLg = useMediaQuery(theme.breakpoints.down(1366));
  const isDownLg = useMediaQuery(theme.breakpoints.down(1021));
  const [sideMenu, setSideMenu] = useState(false);
  const [scrollParams, setScrollParams] = useState(defaultScrollParams);

  const styles = useMemo(
    () =>
      sideMenu || scrollParams.isScrollDown
        ? { transform: 'translateY(-100%)' }
        : {},
    [sideMenu, scrollParams.isScrollDown],
  );

  const background = useMemo(
    () => (scrollParams.isTop ? 'transparent' : 'background.default'),
    [scrollParams.isTop],
  );

  const toggleMenu = () => setSideMenu(isMenu => !isMenu);

  const handleScroll = useCallback(() => {
    if (isBrowser) {
      const listener = () => {
        const scrollTop = window.scrollX || document.documentElement.scrollTop;
        const isScrollDown = scrollTop > lastScrollTop;
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        setScrollParams({ isScrollDown, isTop: !scrollTop });
      };

      window.addEventListener('scroll', listener);
    }

    return () => {
      if (isBrowser) {
        window.removeEventListener('scroll', () => undefined);
      }
    };
  }, []);

  const handleMouseMove = useCallback(() => {
    if (isBrowser) {
      const listener = (e: MouseEvent) => {
        const showHeader = e.y <= headerHeight;
        if (e.y <= headerHeight) {
          setScrollParams(p =>
            p.isScrollDown && showHeader ? { ...p, isScrollDown: false } : p,
          );
        }
      };

      window.addEventListener('mousemove', listener);
    }

    return () => {
      if (isBrowser) {
        window.removeEventListener('mousemove', () => undefined);
      }
    };
  }, []);

  useEffect(() => handleScroll(), [handleScroll]);
  useEffect(() => handleMouseMove(), [handleMouseMove]);

  return (
    <>
      <Grid
        sx={{
          top: 33,
          left: isMd ? 24 : 50,
          zIndex: 100002,
          position: 'fixed',
          transform: scrollParams.isScrollDown
            ? 'translateY(-100px)'
            : undefined,
          transition: 'background .7s ease,transform .7s ease-out',

          ':hover + header': {
            bgcolor: 'background.default',
          },
        }}
      >
        <BurgerIcon open={sideMenu} onClick={toggleMenu} />
      </Grid>

      <Box
        px={isMd ? 3 : 14}
        top={0}
        width="100%"
        height={headerHeight}
        zIndex={10000}
        display="flex"
        flexWrap="nowrap"
        position="fixed"
        bgcolor={background}
        component="header"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          transition: 'background .7s ease,transform .7s ease-out',
          ...styles,
          ':hover': {
            bgcolor: 'background.default',
          },
        }}
      >
        <div style={{ ...menuWrapperSx, justifyContent: 'flex-start' }}>
          {!isLg &&
            headerLinks.map(link => (
              <Grid item px={1.875} key={link.name}>
                <Link href={link.url}>
                  <Typography variant="body2">{link.name}</Typography>
                </Link>
              </Grid>
            ))}
        </div>

        <div
          style={{
            left: '50%',
            position: 'absolute',
            transform: 'translateX(-50%)',
            justifyContent: 'flex-start',
          }}
        >
          <Logo />
        </div>

        <div style={{ ...menuWrapperSx, justifyContent: 'flex-end' }}>
          {!isDownLg && (
            <>
              <Grid item px={1.875}>
                <Typography variant="body2">Create Account</Typography>
              </Grid>

              <Grid item px={1.875}>
                <Typography variant="body2" color="primary">
                  Log In
                </Typography>
              </Grid>

              <Grid item px={1.875}>
                <Typography variant="body2">create account</Typography>
              </Grid>
            </>
          )}
        </div>
      </Box>

      <SideMenu open={sideMenu} onClose={toggleMenu} />
    </>
  );
};

export default Header;
