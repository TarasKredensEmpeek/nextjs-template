import { ComponentsOverrides } from '@/theme/types';

import buttons from './buttons';
import textFields from './textFields';
import booleanFields from './booleanFields';

const components: ComponentsOverrides = {
  ...textFields,
  ...booleanFields,

  MuiSvgIcon: {
    styleOverrides: {
      fontSizeSmall: {
        // fontSize: '1.264em',
      },
      fontSizeMedium: {
        // fontSize: '1.58rem',
      },
      fontSizeLarge: {
        // fontSize: '1.78rem',
      },
    },
  },

  MuiButton: buttons,
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },

  MuiFormHelperText: {
    defaultProps: { color: 'error' },

    styleOverrides: {
      root: {
        position: 'absolute',
        marginLeft: 0,
        marginRight: 0,
        top: '85%',
        fontSize: '0.75em',
        fontFamily: 'StagSans-Book',
      },
    },
  },
  MuiFormControlLabel: {
    defaultProps: {
      componentsProps: { typography: { variant: 'caption' } },
    },

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
