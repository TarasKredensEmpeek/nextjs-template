import React, { FC, InputHTMLAttributes, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import MuiInput, { InputProps } from '@mui/material/Input';
import { InputBaseProps } from '@mui/material/InputBase/InputBase';
import {
  useController,
  Control,
  UseControllerProps,
  UseControllerReturn,
} from 'react-hook-form';

import useStyles from './useStyles';

export interface TInputProps
  extends InputHTMLAttributes<InputProps>,
    UseControllerProps {
  name: string;
  type?: string;
  label?: string;
  control: Control;
  required?: boolean;
  withBorder?: boolean;
  placeholder?: string;
  defaultValue?: string;
  boldInputText?: boolean;
  inputComponent?: InputBaseProps['inputComponent'];
  endAdornment?: React.ReactNode;
}

const TextField: FC<TInputProps> = ({
  name,
  rules,
  type = 'text',
  control,
  disabled,
  required,
  placeholder = '',
  endAdornment,
  defaultValue = '',
  inputComponent,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

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

  return (
    <Grid container style={{ position: 'relative' }}>
      <MuiInput
        fullWidth
        disableUnderline
        {...field}
        type={type}
        name={name}
        required={required}
        disabled={disabled}
        placeholder={placeholderText}
        error={isError}
        inputComponent={inputComponent}
        endAdornment={endAdornment}
      />

      {isError && (
        <Typography variant="fieldError" className={classes.formHelperText}>
          {t(errorMessage)}
        </Typography>
      )}
    </Grid>
  );
};

export default TextField;
