import { Components, Theme } from '@mui/material/styles';

const components: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        fontWeight: 100,
      },

      text: {
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },

      outlined: ({ theme }) => ({
        '&:hover': {
          color: 'white',
          backgroundColor: theme.palette.primary.main,
        },
      }),

      contained: {
        color: 'white',
      },
    },
  },
};

export default components;
