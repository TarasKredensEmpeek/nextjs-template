import { buttonClasses, ButtonProps } from '@mui/material/Button';
import { ComponentsPropsList } from '@mui/material/styles/props';
import { Theme } from '@mui/material/styles';

import { ComponentsOverrides, OverrideThemeProps } from '../types';

type OwnerState = ComponentsPropsList['MuiButton'];
type ButtonOverrides = Omit<OverrideThemeProps, 'ownerState'> & {
  ownerState?: OwnerState;
};

const getColorPack = (color: ButtonProps['color'], theme: Theme) => {
  if (!color || color === 'inherit') {
    return theme.palette.primary;
  }

  return theme.palette[color];
};

const buttonsOverrides: ComponentsOverrides['MuiButton'] = {
  defaultProps: {},
  styleOverrides: {
    root: {
      height: 42,
      borderRadius: 0,
    },

    text: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },

    outlined: ({ theme }) => ({
      borderWidth: 2,
      color: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,

      '&:hover': {
        color: 'white',
        backgroundColor: theme.palette.primary.main,
        border: `2px solid ${theme.palette.primary.main}`,
      },

      [`&.${buttonClasses.disabled}`]: {
        borderWidth: 2,
        borderColor: '#9E9E9E',
      },
    }),

    contained: {
      color: 'white',
      [`&.${buttonClasses.disabled}`]: {
        backgroundColor: '#EBEBEB',
      },

      '&:hover': {
        boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.3)',
      },
    },

    textSecondary: {
      color: '#B3B3B3',

      '&:hover': {
        color: '#024B78',
      },

      [`&.${buttonClasses.disabled}`]: {
        color: '#CACACA',
      },
    },
  },

  variants: [
    {
      props: { variant: 'loadingText' },
      style: ({ theme, ownerState }: ButtonOverrides) => {
        const { color = 'primary' } = ownerState || {};
        const colorPack = getColorPack(color, theme);

        return {
          color: `${colorPack.main} !important`,
          backgroundColor: 'transparent',
          '&:hover': {
            color: colorPack.main,
            backgroundColor: 'transparent',
          },
        };
      },
    },

    {
      props: { variant: 'loadingOutlined' },
      style: ({ theme, ownerState }: ButtonOverrides) => {
        const { color = 'primary' } = ownerState || {};
        const colorPack = getColorPack(color, theme);

        return {
          color: `${colorPack.contrastText} !important`,
          backgroundColor: colorPack.light,
          '&:hover': {
            color: colorPack.contrastText,
            backgroundColor: colorPack.light,
          },
        };
      },
    },
    {
      props: { variant: 'loadingContained' },
      style: ({ ownerState, theme }: ButtonOverrides) => {
        const { color = 'primary' } = ownerState || {};
        const colorPack = getColorPack(color, theme);

        return {
          color: `${colorPack.contrastText} !important`,
          backgroundColor: colorPack.dark,
          '&:hover': {
            color: colorPack.contrastText,
            backgroundColor: colorPack.dark,
          },
        };
      },
    },
  ],
};

export default buttonsOverrides;
