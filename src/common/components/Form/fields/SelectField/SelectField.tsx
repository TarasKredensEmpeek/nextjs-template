import React, { FC, InputHTMLAttributes, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { SxProps, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Select, { SelectProps } from '@mui/material/Select';
import {
  useController,
  Control,
  UseControllerProps,
  UseControllerReturn,
} from 'react-hook-form';

import { FieldOptions } from '@/types/form';

export interface SelectFieldProps
  extends InputHTMLAttributes<SelectProps>,
    UseControllerProps {
  name: string;
  control: Control;
  options: FieldOptions;
  label?: string;
  leftLabel?: string;
  rightLabel?: string;
  fieldSxProps?: SxProps<Theme>;
  defaultValue?: string | number;
}

const SelectField: FC<SelectFieldProps> = ({
  name,
  control,
  rules,
  label,
  leftLabel,
  rightLabel,
  options,
  defaultValue,
  fieldSxProps = {},
}) => {
  const { t } = useTranslation();
  const { field, fieldState }: UseControllerReturn = useController({
    name,
    rules,
    control,
    defaultValue,
  });
  const { error } = fieldState;

  const isError = useMemo(() => Boolean(error), [error]);
  const errorMessage = useMemo(() => error?.message, [error?.message]);

  return (
    <Grid container style={{ position: 'relative' }} alignItems="center">
      {leftLabel && <Typography variant="label1">{t(leftLabel)}</Typography>}

      <Select {...field} label={label} sx={fieldSxProps}>
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {t(String(option.label))}
          </MenuItem>
        ))}
      </Select>

      {rightLabel && <Typography variant="label1">{t(rightLabel)}</Typography>}

      {isError && <Typography variant="fieldError">{errorMessage}</Typography>}
    </Grid>
  );
};

export default SelectField;
