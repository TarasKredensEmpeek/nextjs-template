import React, { FC, useMemo, useState } from 'react';
import { Control } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import { TextFieldProps } from '@mui/material/TextField';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';

import TextField from '../TextField';

interface IProps {
  name: string;
  color?: TextFieldProps['color'];
  control: Control;
  placeholder?: string;
  required?: boolean;
}

const PasswordField: FC<IProps> = ({
  name,
  color = 'primary',
  control,
  required,
  placeholder,
}: IProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const ShowHideIcon = useMemo(
    () => (showPassword ? Visibility : VisibilityOff),
    [showPassword],
  );

  const endAdornment = useMemo(
    () => (
      <InputAdornment position="start">
        <IconButton
          color={showPassword ? color : 'default'}
          aria-label="toggle password visibility"
          onClick={() => setShowPassword(prevState => !prevState)}
          edge="end"
        >
          <ShowHideIcon fontSize="small" />
        </IconButton>
      </InputAdornment>
    ),
    [ShowHideIcon, showPassword, color],
  );

  const fieldType = useMemo(
    () => (showPassword ? 'text' : 'password'),
    [showPassword],
  );

  return (
    <TextField
      color={color}
      name={name}
      control={control}
      type={fieldType}
      endAdornment={endAdornment}
      placeholder={placeholder}
      required={required}
    />
  );
};

export default PasswordField;
