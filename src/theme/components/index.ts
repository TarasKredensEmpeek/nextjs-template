import { ComponentsOverrides } from '@/theme/types';

import buttons from './buttons';
import textFields from './textFields';
import cssBaseline from './cssBaseline';

const components: ComponentsOverrides = {
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
    styleOverrides: {
      root: {
        cursor: 'pointer',
      },
    },
  },
  ...textFields,
};

export default components;
