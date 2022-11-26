import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import LocalPhoneIcon from '@mui/icons-material/LocalPhoneOutlined';

import paths from '@common/constants/paths';
import { isBrowser } from '@common/utils/ssrHelpers';
import { openModal } from '@common/utils/eventEmitter';
import useAuthProvider from '@common/hooks/useAuthProvider';
import { AuthViews, ModalNames } from '@common/constants/enums';

import Logo from '../logo';
import SideMenu from './SideMenu';
import BurgerIcon from './BurgerIcon';
import HeaderLink from './HeaderLink';
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

const getLinkSx = (color = 'inherit') => ({
  color,
  cursor: 'pointer',
});

const staticHeaderOnPaths = [paths.account];

const Header = () => {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isLg = useMediaQuery(theme.breakpoints.down(1366));
  const isDownLg = useMediaQuery(theme.breakpoints.down(1021));
  const [sideMenu, setSideMenu] = useState(false);
  const [scrollParams, setScrollParams] = useState(defaultScrollParams);

  const { logout, isAuthorized, user } = useAuthProvider();

  const isStaticHeader = useMemo(
    () => staticHeaderOnPaths.includes(router.pathname),
    [router],
  );

  const styles = useMemo(
    () =>
      !isStaticHeader && (sideMenu || scrollParams.isScrollDown)
        ? { transform: 'translateY(-100%)' }
        : {},
    [sideMenu, isStaticHeader, scrollParams.isScrollDown],
  );

  const background = useMemo(
    () => (scrollParams.isTop ? 'transparent' : 'background.default'),
    [scrollParams.isTop],
  );

  const toggleMenu = () => setSideMenu(isMenu => !isMenu);

  const handleLoginLogout = () => {
    if (isAuthorized) {
      logout();
      return;
    }

    openModal(ModalNames.auth, { view: AuthViews.login }, undefined, 'sm');
  };

  const handleCreateAccount = () => {
    if (isAuthorized) {
      router.push(paths.account);
      return;
    }

    openModal(ModalNames.auth, { view: AuthViews.createAccount });
  };

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
          transform:
            !isStaticHeader && scrollParams.isScrollDown
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
        bgcolor={background}
        position={isStaticHeader ? 'static' : 'fixed'}
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
        <Grid item sx={{ ...menuWrapperSx, justifyContent: 'flex-start' }}>
          {!isLg &&
            headerLinks.map(link => (
              <Grid item px={1.875} key={link.name} sx={getLinkSx()}>
                {link.external ? (
                  <HeaderLink name={link.name} />
                ) : (
                  <Link href={link.url}>
                    <HeaderLink name={link.name} />
                  </Link>
                )}
              </Grid>
            ))}
        </Grid>

        <Grid
          item
          sx={{
            left: '50%',
            cursor: 'pointer',
            position: 'absolute',
            transform: 'translateX(-50%)',
            justifyContent: 'flex-start',
          }}
        >
          <Link href={paths.home}>
            <div>
              <Logo />
            </div>
          </Link>
        </Grid>

        <Grid item sx={{ ...menuWrapperSx, justifyContent: 'flex-end' }}>
          {!isDownLg && (
            <>
              <Grid
                item
                px={1.875}
                sx={getLinkSx()}
                onClick={handleCreateAccount}
              >
                <Typography variant="body2">
                  {t(
                    isAuthorized
                      ? 'buttons.namedAccount'
                      : 'buttons.createAccount',
                    { name: user?.firstName },
                  )}
                </Typography>
              </Grid>

              <Grid
                item
                px={1.875}
                onClick={handleLoginLogout}
                sx={getLinkSx()}
              >
                <Typography variant="body2" color="primary">
                  {t(isAuthorized ? 'buttons.logout' : 'buttons.login')}
                </Typography>
              </Grid>

              <Grid
                item
                px={1.875}
                sx={{
                  ...getLinkSx(),
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2">800 591 9198</Typography>
                <LocalPhoneIcon
                  color="primary"
                  fontSize="medium"
                  sx={{ pl: 1.2, mb: 0.5, fontSize: '29.7px' }}
                />
              </Grid>
            </>
          )}

          {isDownLg && (
            <LocalPhoneIcon color="primary" sx={{ cursor: 'pointer' }} />
          )}
        </Grid>
      </Box>

      <SideMenu open={sideMenu} onClose={toggleMenu} />
    </>
  );
};

export default Header;
