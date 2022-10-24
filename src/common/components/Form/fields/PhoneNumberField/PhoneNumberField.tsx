import React, { FC, useMemo } from 'react';
import clsx from 'clsx';
import i18next from 'i18next';
import Grid from '@mui/material/Grid';
import { MuiTelInput } from 'mui-tel-input';
import { useTranslation } from 'react-i18next';
import {
  Control,
  useController,
  UseControllerProps,
  UseControllerReturn,
} from 'react-hook-form';
import Typography from '@mui/material/Typography';

import useStyles from '../TextField/useStyles';

export interface TInputProps extends UseControllerProps {
  name: string;
  type?: string;
  label?: string;
  control: Control;
  required?: boolean;
  withBorder?: boolean;
  placeholder?: string;
  defaultValue?: string;
  boldInputText?: boolean;
}

const PhoneNumberField: FC<TInputProps> = ({
  boldInputText,
  name,
  rules,
  control,
  defaultValue,
  placeholder = '',
  required,
  withBorder,
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
  const errorMessage = useMemo(() => error?.message || '', [error?.message]);
  const placeholderText = useMemo(
    () => (required ? `${t(placeholder)} *` : t(placeholder)),
    [placeholder, required, t],
  );

  const inputClasses = {
    root: clsx(classes.inputField, {
      [classes.withBorder]: withBorder,
      [classes.boldInputText]: boldInputText,
    }),
    error: classes.error,
    focused: classes.inputFocused,
  };

  return (
    <Grid container style={{ position: 'relative' }}>
      <MuiTelInput
        fullWidth
        size="small"
        {...props}
        {...field}
        langOfCountryName={language}
        InputProps={{
          classes: inputClasses,
          disableUnderline: true,
          error: isError,
        }}
        placeholder={placeholderText}
        variant="standard"
      />

      {isError && (
        <Typography variant="fieldError" className={classes.formHelperText}>
          {t(errorMessage)}
        </Typography>
      )}
    </Grid>
  );
};

export default PhoneNumberField;
