import { ComponentsPropsList } from '@mui/material/styles/props';
import { buttonClasses } from '@mui/material/Button';

import { ComponentsOverrides, OverrideThemeProps } from '../types';

type OwnerState = ComponentsPropsList['MuiButton'];
type ButtonOverrides = Omit<OverrideThemeProps, 'ownerState'> & {
  ownerState?: OwnerState;
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

      [`&:hover`]: {
        boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.3)',
      },
    },
  },

  variants: [
    {
      props: { variant: 'circle', color: 'primary' },
      style: ({ theme }) => ({
        width: 40,
        height: 40,
        minWidth: 40,
        borderRadius: '50%',
        backgroundColor: theme.palette.transparent,
        border: '2px solid',
        color: theme.palette.primary.dark,
        borderColor: theme.palette.primary.dark,
        '&:hover': {
          color: theme.palette.text.primary,
          borderColor: theme.palette.border.dark,
        },
      }),
    },

    {
      props: { variant: 'rounded', color: 'primary' },
      style: ({ theme }: ButtonOverrides) => {
        const mainColor = theme.palette.primary.dark;
        const border = `2px solid ${mainColor}`;

        return {
          border,
          height: 40,
          borderRadius: 40,
          color: mainColor,
          fontWeight: 700,
          backgroundColor: 'transparent',
          '&:hover': {
            color: theme.palette.text.secondary,
            backgroundColor: mainColor,
          },
        };
      },
    },
  ],
};

export default buttonsOverrides;
