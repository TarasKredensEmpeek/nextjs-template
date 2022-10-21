import { ComponentsOverrides } from '@/theme/types';

const buttonsOverrides: ComponentsOverrides['MuiButton'] = {
  styleOverrides: {
    root: {
      height: 42,
      fontSize: 14,
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
};

export default buttonsOverrides;
