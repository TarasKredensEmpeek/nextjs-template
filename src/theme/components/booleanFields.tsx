import React from 'react';

import { ComponentsOverrides } from '@/theme/types';

import {
  Radio,
  RadioChecked,
  Checkbox,
  CheckboxChecked,
  IndeterminateIcon,
} from './icons';

const checkboxOverrides: ComponentsOverrides['MuiCheckbox'] = {
  defaultProps: {
    color: 'primary',
    disableRipple: true,
    icon: <Checkbox />,
    checkedIcon: <CheckboxChecked />,
    indeterminateIcon: <IndeterminateIcon />,
  },
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      const { color = 'primary' } = ownerState || {};
      const colorSections = color === 'default' ? 'primary' : color;

      return {
        color: theme.palette.border.light,
        '& .MuiSvgIcon-root': {
          stroke: theme.palette.border.light,
        },

        '&:hover': {
          '& .MuiSvgIcon-root': {
            color: theme.palette[colorSections].main,
            stroke: theme.palette[colorSections].main,
          },
        },

        '&.Mui-disabled': {
          color: theme.palette.border.light,
          '& .MuiSvgIcon-root': {
            stroke: theme.palette.text.disabled,
          },
        },

        '&.MuiCheckbox-indeterminate': {
          color: theme.palette[colorSections].light,
          '& .MuiSvgIcon-root': {
            stroke: theme.palette[colorSections].main,
          },
        },

        '&.Mui-checked:not(.Mui-disabled)': {
          color: theme.palette[colorSections].light,
          '& .MuiSvgIcon-root': {
            stroke: theme.palette[colorSections].main,
          },
        },
      };
    },
  },
};
const radioOverrides: ComponentsOverrides['MuiRadio'] = {
  defaultProps: {
    disableRipple: true,
    icon: <Radio />,
    checkedIcon: <RadioChecked />,
  },
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      const { color = 'primary' } = ownerState || {};
      const colorSections = color === 'default' ? 'primary' : color;

      return {
        color: theme.palette.border.light,
        '& .MuiSvgIcon-root': {
          stroke: theme.palette.border.light,
        },

        '&:hover': {
          '& .MuiSvgIcon-root': {
            color: theme.palette[colorSections].main,
            stroke: theme.palette[colorSections].main,
          },
        },

        '&.Mui-disabled': {
          color: theme.palette.border.light,
          '& .MuiSvgIcon-root': {
            stroke: theme.palette.text.disabled,
          },
        },

        '&.Mui-checked:not(.Mui-disabled)': {
          color: theme.palette[colorSections].light,
          '& .MuiSvgIcon-root': {
            stroke: theme.palette[colorSections].main,
          },
        },
      };
    },
  },
};

const booleanFields = {
  MuiCheckbox: checkboxOverrides,
  MuiRadio: radioOverrides,
};

export default booleanFields;
