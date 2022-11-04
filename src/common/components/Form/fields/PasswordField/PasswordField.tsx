import React, { FC, useMemo, useState } from 'react';
import { Control } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';

import TextField from '../TextField';

interface IProps {
  name: string;
  control: Control;
  placeholder?: string;
  required?: boolean;
}

const PasswordField: FC<IProps> = ({
  name,
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
          aria-label="toggle password visibility"
          onClick={() => setShowPassword(prevState => !prevState)}
          edge="end"
        >
          <ShowHideIcon fontSize="small" />
        </IconButton>
      </InputAdornment>
    ),
    [ShowHideIcon],
  );

  const fieldType = useMemo(
    () => (showPassword ? 'text' : 'password'),
    [showPassword],
  );

  return (
    <TextField
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
