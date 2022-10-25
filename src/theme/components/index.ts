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
        marginLeft: 0,
        marginRight: 0,
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
