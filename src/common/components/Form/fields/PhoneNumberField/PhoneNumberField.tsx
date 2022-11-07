import React, { FC, useMemo } from 'react';
import i18next from 'i18next';
import Grid from '@mui/material/Grid';
import { MuiTelInput } from 'mui-tel-input';
import { useTranslation } from 'react-i18next';
import { TextFieldProps } from '@mui/material/TextField';
import {
  Control,
  useController,
  UseControllerProps,
  UseControllerReturn,
} from 'react-hook-form';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

export interface PhoneInputProps extends UseControllerProps {
  name: string;
  type?: string;
  label?: string;
  color: TextFieldProps['color'];
  control: Control;
  variant: TextFieldProps['variant'];
  required?: boolean;
  withBorder?: boolean;
  placeholder?: string;
  defaultValue?: string;
  boldInputText?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(0.5),
    '&>.MuiInputAdornment-root': {
      marginTop: theme.spacing(0.2),
      marginRight: theme.spacing(0.5),

      '&.MuiInputAdornment-positionStart:not(.MuiInputAdornment-hiddenLabel)': {
        marginTop: theme.spacing(0.2),
      },
    },
  },
}));

const PhoneNumberField: FC<PhoneInputProps> = ({
  name,
  rules,
  color = 'secondary',
  control,
  variant = 'filled',
  required,
  placeholder = '',
  defaultValue = '',
  ...props
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { language } = i18next;
  const { field, fieldState }: UseControllerReturn = useController({
    name,
    rules,
    control,
    defaultValue,
  });

  const { error } = fieldState;
  const isError = useMemo(() => Boolean(error), [error]);
  const errorMessage = useMemo(
    () => t(error?.message || ''),
    [t, error?.message],
  );
  const placeholderText = useMemo(
    () => (required ? `${t(placeholder)} *` : t(placeholder)),
    [placeholder, required, t],
  );

  return (
    <Grid container style={{ position: 'relative' }}>
      <MuiTelInput
        fullWidth
        size="small"
        {...props}
        {...field}
        color={color}
        variant={variant}
        InputProps={{
          classes,
          error: isError,
          disableUnderline: true,
        }}
        helperText={errorMessage}
        placeholder={placeholderText}
        langOfCountryName={language}
      />
    </Grid>
  );
};

export default PhoneNumberField;
