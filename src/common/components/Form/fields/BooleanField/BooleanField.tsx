import React, { FC, ReactNode, useMemo } from 'react';
import Box from '@mui/material/Box';
import Radio, { RadioProps } from '@mui/material/Radio';
import FormHelperText from '@mui/material/FormHelperText';
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

export interface BooleanFieldProps extends UseControllerProps {
  name: string;
  control: Control;
  type?: BooleanInputTypes;
  label?: ReactNode | FC;
  color?: RadioProps['color'] | CheckboxProps['color'] | SwitchProps['color'];
  size?: RadioProps['size'] | CheckboxProps['size'] | SwitchProps['size'];
  inputProps?:
    | RadioProps['inputProps']
    | CheckboxProps['inputProps']
    | SwitchProps['inputProps'];
  className?: string;
  defaultValue?: string | number;
}

const BooleanField: FC<BooleanFieldProps> = ({
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
  ...props
}) => {
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

  const fieldLabel = useMemo(() => {
    if (typeof label === 'function') {
      const LabelRender = label;
      return <LabelRender />;
    }

    return React.isValidElement(label) ? label : t(label as string);
  }, [label, t]);

  const component = useMemo(
    () => (
      <BooleanInputComponent
        {...props}
        {...field}
        size={size}
        name={name}
        color={color}
        checked={Boolean(field.value)}
        inputProps={{ 'aria-label': `${color} checkbox`, ...inputProps }}
      />
    ),
    [size, name, field, color, props, inputProps, BooleanInputComponent],
  );

  return (
    <Box sx={{ position: 'relative' }}>
      {fieldLabel ? (
        <FormControlLabel
          label={fieldLabel}
          control={component}
          className={className}
        />
      ) : (
        component
      )}

      <FormHelperText error={isError}>{t(errorMessage)}</FormHelperText>
    </Box>
  );
};

export default BooleanField;
