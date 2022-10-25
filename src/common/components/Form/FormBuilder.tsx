import React, { FC, useCallback } from 'react';
import { SxProps } from '@mui/material/styles';
import { UseFormReturn } from 'react-hook-form';
import { ResponsiveStyleValue } from '@mui/system';
import Grid, { GridSpacing } from '@mui/material/Grid';

import Field from './Field';
import FieldsArray from './FieldsArray';
import { FieldsModel, TField } from './types';

interface FormBuilderProps<FormDataType = unknown> {
  form: UseFormReturn<object>;
  formSx?: SxProps;
  onSubmit: (data: FormDataType) => void;
  children?: React.ReactNode;
  fieldsList: FieldsModel;
  submitButtonLabel?: string;
  containerRowSpacing?: ResponsiveStyleValue<GridSpacing>;
  containerColumnSpacing?: ResponsiveStyleValue<GridSpacing>;
  containerSpacing?: ResponsiveStyleValue<GridSpacing>;
  formActions?: React.ElementType;
}

const FormBuilder: FC<FormBuilderProps> = ({
  onSubmit,
  form,
  formSx = {},
  fieldsList,
  children = null,
  containerRowSpacing,
  containerColumnSpacing,
  containerSpacing,
}) => {
  const { control, handleSubmit } = form;

  const renderField = useCallback(
    (fieldParams: TField, index: number) => {
      const key = fieldParams.id || fieldParams.name;

      if (fieldParams.fields?.length) {
        const { fields, ...restParams } = fieldParams;
        return (
          <FieldsArray
            key={key}
            control={control}
            fields={fields}
            {...restParams}
          />
        );
      }

      return (
        <Field key={key} control={control} index={index} {...fieldParams} />
      );
    },
    [control],
  );

  return (
    <Grid
      container
      noValidate
      sx={formSx}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid
        container
        rowSpacing={containerRowSpacing}
        columnSpacing={containerColumnSpacing}
        spacing={containerSpacing}
        justifyContent="flex-start"
        alignItems="center"
        style={{ padding: '16px 0' }}
      >
        {fieldsList.map(renderField)}
      </Grid>

      {children}
    </Grid>
  );
};

export default FormBuilder;
