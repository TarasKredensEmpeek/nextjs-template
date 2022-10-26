import { ComponentsOverrides } from '@/theme/types';

import buttons from './buttons';
import textFields from './textFields';
import cssBaseline from './cssBaseline';

const components: ComponentsOverrides = {
  ...textFields,

  MuiButton: buttons,
  MuiCssBaseline: cssBaseline,
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        position: 'absolute',
        marginLeft: 0,
        marginRight: 0,
        top: '85%',
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        fontWeight: 'normal',
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
    defaultProps: { underline: 'none' },
    styleOverrides: {
      root: {
        cursor: 'pointer',
      },
    },
  },
};

export default components;
