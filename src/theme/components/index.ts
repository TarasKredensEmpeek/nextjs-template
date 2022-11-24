import { ComponentsOverrides } from '@/theme/types';

import buttons from './buttons';
import textFields from './textFields';
import booleanFields from './booleanFields';

const labelStyleOverrides = {
  root: {
    fontSize: '0.875em',
    fontFamily: 'StagSans-Book',
    textTransform: 'uppercase',
  },
};

const bgListOptionStyle = { backgroundColor: '#FAF3E9 !important' };

const hoverListOption = {
  '&:hover': bgListOptionStyle,
};

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
    styleOverrides: labelStyleOverrides,
  } as ComponentsOverrides['MuiFormLabel'],
  MuiInputLabel: {
    styleOverrides: labelStyleOverrides,
  } as ComponentsOverrides['MuiInputLabel'],

  MuiSelect: {
    styleOverrides: {
      select: {
        paddingTop: 9,
        paddingBottom: 8,
      },
      icon: {
        color: '#9E9E9E',
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: {
        left: '0px !important',
        marginTop: 1,
        border: '1px solid #CACACA',

        '& .MuiAutocomplete-option': {
          ...hoverListOption,

          '&.Mui-focused': {
            ...bgListOptionStyle,
          },
        },
      },
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: () => ({
        ...hoverListOption,
        '&.Mui-focusVisible': bgListOptionStyle,

        '&.Mui-selected': {
          ...bgListOptionStyle,
          ...hoverListOption,
        },
      }),
    },
  },

  MuiAutocomplete: {
    styleOverrides: {
      inputRoot: {
        paddingTop: '9px !important',
      },
    },
  },
};

export default components;
