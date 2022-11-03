import { formHelperTextClasses } from '@mui/material/FormHelperText';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { ComponentsPropsList } from '@mui/material/styles/props';
import { filledInputClasses } from '@mui/material/FilledInput';
import { inputClasses } from '@mui/material/Input';

import { ComponentsOverrides, OverrideThemeProps } from '../types';

type OwnerState = ComponentsPropsList['MuiOutlinedInput' | 'MuiFilledInput'];

type InputOverrides = Omit<OverrideThemeProps, 'ownerState'> & {
  ownerState: OwnerState;
};

const notDisabledSelector = `:hover:not(.${inputClasses.disabled}):before`;

const getBaseInput = ({ theme, ownerState }: InputOverrides) => {
  const { size } = ownerState;

  const paddingValue = size === 'small' ? 1.25 : 1.5;

  return {
    height: 20,
    borderWidth: 1,
    fontFamily: 'StagSans-Book',
    fontSize: `${size === 'small' ? 0.875 : 1}em`,
    paddingTop: theme.spacing(paddingValue),
    paddingBottom: theme.spacing(paddingValue),
    '&::placeholder': {
      textTransform: 'uppercase',
    },
  };
};

const filledInputOverrides: ComponentsOverrides['MuiFilledInput'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      paddingTop: 0,
      borderRadius: 4,
      backgroundColor: theme.palette.background.secondary,

      [`&.${filledInputClasses.focused}`]: {
        backgroundColor: theme.palette.background.secondary,
      },

      [`&.${filledInputClasses.error}`]: {
        backgroundColor: '#FEF4F3',
      },

      [`&:before, :after, :hover, ${notDisabledSelector}`]: {
        border: 'none',
        borderBottomStyle: 'none',
      },

      [`&.${filledInputClasses.disabled}`]: {
        '&:before': {
          borderBottomStyle: 'none',
        },
      },
    }),

    input: ({ theme, ownerState }) => ({
      ...getBaseInput({ theme, ownerState }),
      borderRadius: 4,

      [`&.${filledInputClasses.disabled}`]: {
        color: theme.palette.text.disabled,
        backgroundColor: theme.palette.background.secondary,

        '&:before': {
          borderBottomStyle: 'none',
        },
      },
    }),

    focused: ({ theme }: InputOverrides) => ({
      backgroundColor: theme.palette.background.secondary,
    }),
  },
};

const outlinedInputOverrides: ComponentsOverrides['MuiOutlinedInput'] = {
  styleOverrides: {
    root: ({ theme }: InputOverrides) => ({
      borderWidth: 1,
      borderColor: theme.palette.neutral.light,

      [`&.${outlinedInputClasses.disabled}`]: {
        color: theme.palette.text.disabled,
        backgroundColor: theme.palette.background.secondary,
      },

      [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
        {
          borderWidth: 1,
        },

      [`&.${outlinedInputClasses.focused}:not(.${outlinedInputClasses.error}) .${outlinedInputClasses.notchedOutline}`]:
        {
          borderColor: theme.palette.neutral.light,
        },

      [`&:hover:not(.${outlinedInputClasses.error}):not(.${outlinedInputClasses.focused}):not(.${outlinedInputClasses.disabled}) .${outlinedInputClasses.notchedOutline}`]:
        {
          borderColor: theme.palette.primary.main,
        },

      [`&:hover:is(.${outlinedInputClasses.error}) .${outlinedInputClasses.notchedOutline}`]:
        {
          borderColor: theme.palette.error.dark,

          [`.${formHelperTextClasses.root}`]: {
            color: theme.palette.error.main,
          },
        },
    }),

    input: getBaseInput,

    error: ({ theme }: InputOverrides) => ({
      borderColor: theme.palette.error.light,
      backgroundColor: '#FEF4F3',
    }),
  },
};

const textFields = {
  MuiFilledInput: filledInputOverrides,
  MuiOutlinedInput: outlinedInputOverrides,
};

export default textFields;
