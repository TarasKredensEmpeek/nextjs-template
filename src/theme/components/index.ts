import { ComponentsOverrides } from '@/theme/types';

import buttons from './buttons';
import textFields from './textFields';

const components: ComponentsOverrides = {
  ...textFields,

  MuiButton: buttons,
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiFormHelperText: {
    defaultProps: { color: 'error.dark' },

    styleOverrides: {
      root: {
        position: 'absolute',
        marginLeft: 0,
        marginRight: 0,
        top: '85%',
      },
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      root: {
        lineHeight: 1,
      },
    },
  },
  MuiLink: {
    defaultProps: { color: 'text.link' },

    styleOverrides: {
      root: {
        cursor: 'pointer',
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        fontSize: '0.875em',
        fontFamily: 'StagSans-Book',
      },
    },
  },
};

export default components;
