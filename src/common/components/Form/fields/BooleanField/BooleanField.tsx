import React, { FC, useMemo } from 'react';
import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';
import Switch, { SwitchProps } from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import {
  useController,
  Control,
  UseControllerProps,
  UseControllerReturn,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export enum BooleanInputTypes {
  checkbox = 'checkbox',
  switch = 'switch',
  radio = 'radio',
}

const booleanInputs = {
  [BooleanInputTypes.checkbox]: Checkbox,
  [BooleanInputTypes.switch]: Switch,
  [BooleanInputTypes.radio]: Radio,
};

export interface TBoolFieldProps extends UseControllerProps {
  name: string;
  control: Control;
  type?: BooleanInputTypes;
  label?: string | React.ReactElement;
  color?: RadioProps['color'] | CheckboxProps['color'] | SwitchProps['color'];
  size?: RadioProps['size'] | CheckboxProps['size'] | SwitchProps['size'];
  inputProps?:
    | RadioProps['inputProps']
    | CheckboxProps['inputProps']
    | SwitchProps['inputProps'];
  className?: string;
  defaultValue?: string | number;
  labelTypographySx?: SxProps<Theme>;
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: { padding: spacing(1), color: '#BCBFBE', '& svg': { fontSize: 24 } },
}));

const BooleanField: FC<TBoolFieldProps> = ({
  name,
  label,
  type = BooleanInputTypes.checkbox,
  size = 'medium',
  rules,
  color = 'primary',
  control,
  className,
  inputProps = {},
  defaultValue = false,
  labelTypographySx,
  ...props
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

  const BooleanInputComponent = booleanInputs[type] || Switch;
  const isError = useMemo(() => Boolean(error), [error]);
  const errorMessage = useMemo(() => error?.message || '', [error?.message]);

  const component = useMemo(
    () => (
      <BooleanInputComponent
        {...props}
        {...field}
        size={size}
        name={name}
        color={color}
        checked={Boolean(field.value)}
        classes={classes}
        inputProps={{ 'aria-label': `${color} checkbox`, ...inputProps }}
      />
    ),
    [
      size,
      name,
      field,
      color,
      props,
      classes,
      inputProps,
      BooleanInputComponent,
    ],
  );

  return (
    <Box sx={{ position: 'relative' }}>
      {label ? (
        <FormControlLabel
          label={
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, ...labelTypographySx }}
            >
              {React.isValidElement(label) ? label : t(label)}
            </Typography>
          }
          control={component}
          className={className}
        />
      ) : (
        component
      )}
      {isError && (
        <Typography
          variant="fieldError"
          sx={{ left: 8, top: '95%', position: 'absolute' }}
        >
          {t(errorMessage)}
        </Typography>
      )}
    </Box>
  );
};

export default BooleanField;
