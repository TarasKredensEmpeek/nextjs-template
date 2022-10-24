import React, { FC, InputHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio, { RadioProps } from '@mui/material/Radio';
import { TypographyVariants } from '@mui/material/styles';
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
  name: string;
  control: Control;
  options: FieldOptions;
  type?: string;
  label?: string;
  inputProps?: RadioProps['inputProps'];
  classNames?: string;
  labelVariant?: TypographyVariants;
  defaultValue?: string | number;
}

const componentsProps: FormControlLabelProps['componentsProps'] = {
  typography: { variant: 'subtitle1' },
};

const RadioGroupField: FC<TRadioGroupFieldProps> = ({
  name,
  label,
  rules,
  control,
  options,
  inputProps = {},
  defaultValue = false,
}) => {
  const { t } = useTranslation();
  const { field }: UseControllerReturn = useController({
    name,
    rules,
    control,
    defaultValue,
  });

  return (
    <RadioGroup {...field}>
      {!!label && <FormLabel>{t(label)}</FormLabel>}

      {options.map(option => (
        <FormControlLabel
          key={option.id}
          value={option.value}
          label={t(option.label || '')}
          componentsProps={componentsProps}
          control={<Radio inputProps={inputProps} />}
        />
      ))}
    </RadioGroup>
  );
};

export default RadioGroupField;
