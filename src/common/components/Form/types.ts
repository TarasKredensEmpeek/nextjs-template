import { FC, ReactElement } from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import { Variant } from '@mui/material/styles/createTypography';
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';

import { TInputProps } from '@common/components/Form/fields/TextField';

export interface TDivider {
  divider?: boolean;
  id?: string;
}

export interface TTitle {
  titleVariant?: Variant;
  title?: string;
  id?: string;
}

interface TFieldSelectOption {
  label: string | number;
  value: string | number;
  xs?: number;
  id?: string;
}

export type TFieldOptions = TFieldSelectOption[];

export interface FieldComponentProps extends TInputProps {
  control: UseFormReturn['control'];
}

export interface TField extends TDivider, TTitle {
  xs?: boolean | number;
  name: string;
  label?: string | ReactElement;
  fields?: TField[];
  hidden?: boolean;
  options?: TFieldOptions;
  required?: boolean;
  resource?: string;
  component?: FC<FieldComponentProps>;
  getLabel?: (f: TField) => string;
  getTitle?: (f: Partial<TField>) => string;
  getOptions?: (f: string) => TFieldOptions;
  disabled?: string;
  leftLabel?: string;
  withBorder?: boolean;
  rightLabel?: string;
  placeholder?: string;
  labelVariant?: Variant;
  defaultValue?: string | number | boolean | never;
  requestParams?: unknown;
  boldInputText?: boolean;
  countFieldName?: string;
  gridItemSx?: SxProps<Theme>;
  fieldSxProps?: SxProps<Theme>;
  labelTypographySx?: SxProps<Theme>;
  getXs?: () => number;
  fieldArrayHelpers?: {
    getNewFieldsForFieldsArray?: (
      fields: { [key: string]: string },
      fieldsCounterName: string,
    ) => TField[];
    getFieldsArrayIndexToRemove?: (
      fields: UseFieldArrayReturn['fields'],
      fieldsCounterName: string,
    ) => number;
    getFieldsForFieldsArrayToCompare?: (
      fields: UseFieldArrayReturn['fields'],
      fieldsCounterName: string,
    ) => TField[];
  };
}

export type FieldsModel = TField[];
