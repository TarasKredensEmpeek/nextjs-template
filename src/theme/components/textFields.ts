import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { ComponentsPropsList } from '@mui/material/styles/props';
import { filledInputClasses } from '@mui/material/FilledInput';
import { inputBaseClasses } from '@mui/material/InputBase';
import { inputClasses } from '@mui/material/Input';

import { ComponentsOverrides, OverrideThemeProps } from '../types';

type OwnerState = ComponentsPropsList[
  | 'MuiOutlinedInput'
  | 'MuiFilledInput'
  | 'MuiFormControl'];

type InputOverrides = Omit<OverrideThemeProps, 'ownerState'> & {
  ownerState: OwnerState;
};

const notDisabledSelector = `:hover:not(.${inputClasses.disabled}):before`;

const getBaseInput = ({ theme, ownerState }: InputOverrides) => {
  const { size } = ownerState;

  const paddingValue = size === 'small' ? 1.25 : 1.5;

  return {
    fontFamily: 'StagSans-Book',
    fontSize: `${size === 'small' ? 0.87 : 1}em`,
    paddingTop: theme.spacing(paddingValue),
    paddingBottom: theme.spacing(paddingValue),
    '&::placeholder': {
      textTransform: 'uppercase',
    },
  };
};

const getBaseFocusInput = ({ theme, ownerState }: InputOverrides) => {
  const { color = 'primary' } = ownerState;

  return {
    borderWidth: 1,
    borderColor: theme.palette[color].light,
  };
};
const inputOverrides: ComponentsOverrides['MuiInput'] = {
  styleOverrides: {
    root: ({ theme, ownerState }: InputOverrides) => {
      const { color = 'primary' } = ownerState;
      const borderBottom = `1px solid ${theme.palette[color].light}`;

      return {
        borderBottom,
        [`&:before, :after, ${notDisabledSelector}`]: { border: 'none' },
        [`&.${inputClasses.focused}`]: { borderBottom },
      };
    },
    input: getBaseInput,
  },
};

const inputBaseOverrides: ComponentsOverrides['MuiInputBase'] = {
  styleOverrides: {
    root: {
      [`&:before, :after, ${notDisabledSelector}`]: { border: 'none' },
      [`&.${inputBaseClasses.focused}`]: { border: 'none' },
    },
    input: getBaseInput,
  },
};

const filledInputOverrides: ComponentsOverrides['MuiFilledInput'] = {
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      const { color = 'primary' } = ownerState;

      const currentColor = theme.palette[color];

      return {
        borderRadius: 4,
        border: `1px solid ${theme.palette.border.light}`,
        backgroundColor: currentColor.light,
        [`&.${filledInputClasses.focused}`]: {
          border: `1px solid ${theme.palette.border.light}`,
        },
        [`&:before, :after, :hover, ${notDisabledSelector}`]: {
          border: `1px solid ${theme.palette.border.light}`,
        },
      };
    },
    input: getBaseInput,
  },
};

const outlinedInputOverrides: ComponentsOverrides['MuiOutlinedInput'] = {
  styleOverrides: {
    input: ({ theme, ownerState }: InputOverrides) =>
      getBaseFocusInput({
        theme,
        ownerState,
      }),
  },
};

const formControlOverrides: ComponentsOverrides['MuiFormControl'] = {
  styleOverrides: {
    root: ({ theme, ownerState }: InputOverrides) => {
      const { color = 'primary' } = ownerState;
      const border = `1px solid ${theme.palette[color].light}`;

      return {
        [`&:before, :after, :hover, ${notDisabledSelector}`]: {
          borderBottom: 'none',
        },

        [`& .${outlinedInputClasses.input}`]: {
          borderRadius: 4,
          border,
        },

        [`& .${outlinedInputClasses.notchedOutline}`]: {
          border: 'none',
          '&:hover': {
            border: 'none',
            outline: 'none',
          },
        },
      };
    },
  },
};

const textFields = {
  MuiInputBase: inputBaseOverrides,

  MuiInput: inputOverrides,
  MuiFilledInput: filledInputOverrides,
  MuiOutlinedInput: outlinedInputOverrides,

  MuiFormControl: formControlOverrides,
};

export default textFields;
