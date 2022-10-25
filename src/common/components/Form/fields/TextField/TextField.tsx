import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { InputBaseProps } from '@mui/material/InputBase/InputBase';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import {
  useController,
  Control,
  UseControllerProps,
  UseControllerReturn,
} from 'react-hook-form';

export interface TInputProps extends UseControllerProps {
  name: string;
  type?: string;
  label?: string;
  control: Control;
  size?: TextFieldProps['size'];
  color?: TextFieldProps['color'];
  variant?: TextFieldProps['variant'];
  disabled?: boolean;
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
  size = 'small',
  color = 'secondary',
  variant = 'filled',
  control,
  disabled,
  required,
  placeholder = '',
  endAdornment,
  defaultValue = '',
  inputComponent,
}) => {
  const { t } = useTranslation();

  const { field, fieldState }: UseControllerReturn = useController({
    name,
    rules,
    control,
    defaultValue,
  });
  const { error } = fieldState;

  const inputProps = useMemo(
    () => ({
      endAdornment,
      inputComponent,
      disableUnderline: true,
    }),
    [endAdornment, inputComponent],
  );

  const isError = useMemo(() => Boolean(error), [error]);
  const errorMessage = useMemo(
    () => t(error?.message || ''),
    [error?.message, t],
  );
  const placeholderText = useMemo(
    () => (required ? `${t(placeholder)} *` : t(placeholder)),
    [placeholder, required, t],
  );

  return (
    <MuiTextField
      fullWidth
      {...field}
      type={type}
      size={size}
      color={color}
      name={name}
      variant={variant}
      required={required}
      disabled={disabled}
      placeholder={placeholderText}
      error={isError}
      helperText={errorMessage}
      InputProps={inputProps}
    />
  );
};

export default TextField;
