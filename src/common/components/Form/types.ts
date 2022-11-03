import { FC, ReactElement } from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import { InputBaseProps } from '@mui/material/InputBase';
import { TextFieldProps } from '@mui/material/TextField';
import { Variant } from '@mui/material/styles/createTypography';
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';

interface BaseFieldParams {
  row?: boolean;
  name: string;
  size?: InputBaseProps['size'];
  label?: string | ReactElement;
  color?: InputBaseProps['color'];
  multiline?: string;
  variant?: TextFieldProps['variant'];
  options?: FieldSelectOption[];
  required?: boolean;
  disabled?: string;
  leftLabel?: string;
  rightLabel?: string;
  placeholder?: string;
  labelVariant?: Variant;
  defaultValue?: string | number | boolean | never;
  requestParams?: unknown;
  labelTypographySx?: SxProps<Theme>;
}

export interface DividerParams {
  divider?: boolean;
  id?: string;
}

export interface TitleParams {
  titleVariant?: Variant;
  title?: string;
  id?: string;
}

interface FieldSelectOption {
  label: string | number;
  value: string | number;
  xs?: number;
  id?: string;
}

export interface FieldComponentProps extends BaseFieldParams {
  control: UseFormReturn['control'];
}

export interface FieldParams
  extends DividerParams,
    TitleParams,
    BaseFieldParams {
  xs?: boolean | number;
  fields?: FieldParams[];
  hidden?: boolean;
  getTitle?: (f: Partial<FieldParams>) => string;
  component?: FC<FieldComponentProps>;
  getOptions?: (f: string) => FieldSelectOption[];
  countFieldName?: string;
  gridItemSx?: SxProps<Theme>;
  fieldSxProps?: SxProps<Theme>;
  getXs?: () => number;
  fieldArrayHelpers?: {
    getNewFieldsForFieldsArray?: (
      fields: { [key: string]: string },
      fieldsCounterName: string,
    ) => FieldParams[];
    getFieldsArrayIndexToRemove?: (
      fields: UseFieldArrayReturn['fields'],
      fieldsCounterName: string,
    ) => number;
    getFieldsForFieldsArrayToCompare?: (
      fields: UseFieldArrayReturn['fields'],
      fieldsCounterName: string,
    ) => FieldParams[];
  };
}

export type FieldsModel = FieldParams[];
