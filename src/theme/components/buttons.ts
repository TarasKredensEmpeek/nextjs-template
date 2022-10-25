import { ComponentsPropsList } from '@mui/material/styles/props';

import { ComponentsOverrides, OverrideThemeProps } from '../types';

type OwnerState = ComponentsPropsList['MuiButton'];
type ButtonOverrides = Omit<OverrideThemeProps, 'ownerState'> & {
  ownerState?: OwnerState;
};

const buttonsOverrides: ComponentsOverrides['MuiButton'] = {
  styleOverrides: {
    root: {
      height: 42,
      fontSize: 14,
      borderRadius: 0,
      fontWeight: 100,
      fontFamily: 'StagSans-Book',
    },

    text: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },

    outlined: ({ theme }) => ({
      borderWidth: 2,

      '&:hover': {
        color: 'white',
        backgroundColor: theme.palette.primary.main,
      },
    }),

    contained: {
      color: 'white',
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
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        '&:hover': {
          color: theme.palette.text.primary,
          borderColor: theme.palette.border.dark,
        },
      }),
    },

    {
      props: { variant: 'rounded', color: 'primary' },
      style: ({ theme }: ButtonOverrides) => {
        const mainColor = theme.palette.primary.main;
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
