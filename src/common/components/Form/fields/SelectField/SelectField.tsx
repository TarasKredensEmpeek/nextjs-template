import React, {
  FC,
  ReactElement,
  InputHTMLAttributes,
  useMemo,
  useState,
} from 'react';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { SxProps, Theme } from '@mui/material/styles';
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
  rightLabel?: string | ReactElement;
  placeholder?: string;
  fieldSxProps?: SxProps<Theme>;
  defaultValue?: string | number;
}

const SelectField: FC<SelectFieldProps> = ({
  name,
  control,
  rules,
  label,
  options,
  leftLabel,
  rightLabel,
  placeholder,
  defaultValue,
  fieldSxProps = {},
}) => {
  const { t } = useTranslation();
  const [opened, setOpened] = useState(false);
  const { field, fieldState }: UseControllerReturn = useController({
    name,
    rules,
    control,
    defaultValue,
  });
  const { error } = fieldState;

  const toggleOpened = () => setOpened(o => !o);

  const isError = useMemo(() => Boolean(error), [error]);
  const errorMessage = useMemo(() => error?.message, [error?.message]);

  return (
    <Grid container style={{ position: 'relative' }} alignItems="center">
      {leftLabel && <Typography variant="body1">{t(leftLabel)}</Typography>}

      <FormControl fullWidth size="small">
        {!field.value && placeholder && !opened && (
          <InputLabel>{t(placeholder)}</InputLabel>
        )}

        <Select
          fullWidth
          {...field}
          label={label}
          sx={fieldSxProps}
          onOpen={toggleOpened}
          onClose={toggleOpened}
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {t(String(option.label))}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {rightLabel && (
        <Typography variant="body1">
          {typeof rightLabel === 'string' ? t(rightLabel) : rightLabel}
        </Typography>
      )}

      {isError && <Typography variant="fieldError">{errorMessage}</Typography>}
    </Grid>
  );
};

export default SelectField;
