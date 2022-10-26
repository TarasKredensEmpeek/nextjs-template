import React, { FC, InputHTMLAttributes, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio, { RadioProps } from '@mui/material/Radio';
import { TypographyVariants } from '@mui/material/styles';
import { FormControl, FormHelperText } from '@mui/material';
import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import {
  useController,
  Control,
  UseControllerProps,
  UseControllerReturn,
} from 'react-hook-form';

import { FieldOptions } from '@/types/form';

interface TRadioGroupFieldProps
  extends InputHTMLAttributes<RadioProps>,
    UseControllerProps {
  row: boolean;
  name: string;
  type?: string;
  label?: string;
  control: Control;
  options: FieldOptions;
  inputProps?: RadioProps['inputProps'];
  classNames?: string;
  labelVariant?: TypographyVariants;
  defaultValue?: string | number;
}

const componentsProps: FormControlLabelProps['componentsProps'] = {
  typography: { variant: 'subtitle1' },
};

const RadioGroupField: FC<TRadioGroupFieldProps> = ({
  row = false,
  name,
  label,
  rules,
  control,
  options,
  inputProps = {},
  defaultValue = false,
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
  const errorMessage = useMemo(
    () => t(error?.message || ''),
    [error?.message, t],
  );

  const stylesX = useMemo(
    () => ({
      display: 'flex',
      flexDirection: row ? 'row' : 'column',
      flexWrap: row ? 'wrap' : 'nowrap',
    }),
    [row],
  );

  return (
    <FormControl error={isError}>
      <RadioGroup {...field}>
        {!!label && <FormLabel>{t(label)}</FormLabel>}

        <Grid sx={stylesX}>
          {options.map(option => (
            <FormControlLabel
              key={option.id}
              value={option.value}
              label={t(option.label || '')}
              componentsProps={componentsProps}
              control={<Radio inputProps={inputProps} />}
            />
          ))}
        </Grid>
      </RadioGroup>

      {isError && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default RadioGroupField;
