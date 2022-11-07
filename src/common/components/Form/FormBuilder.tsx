import React, { FC, useCallback } from 'react';
import { Control } from 'react-hook-form';
import { SxProps } from '@mui/material/styles';
import { ResponsiveStyleValue } from '@mui/system';
import Grid, { GridSpacing } from '@mui/material/Grid';

import Field from './Field';
import FieldsArray from './FieldsArray';
import { FieldsModel, FieldParams } from './types';

interface FormBuilderProps {
  formSx?: SxProps;
  control: Control;
  children?: React.ReactNode;
  fieldsList: FieldsModel;
  formActions?: React.ElementType;
  containerSpacing?: ResponsiveStyleValue<GridSpacing>;
  submitButtonLabel?: string;
  containerRowSpacing?: ResponsiveStyleValue<GridSpacing>;
  containerColumnSpacing?: ResponsiveStyleValue<GridSpacing>;
}

const FormBuilder: FC<FormBuilderProps> = ({
  formSx = {},
  control,
  children = null,
  fieldsList,
  containerSpacing,
  containerRowSpacing,
  containerColumnSpacing,
}) => {
  const renderField = useCallback(
    (fieldParams: FieldParams, index: number) => {
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
    <Grid container sx={formSx}>
      <Grid
        container
        rowSpacing={containerRowSpacing}
        columnSpacing={containerColumnSpacing}
        spacing={containerSpacing}
        justifyContent="flex-start"
        alignItems="center"
      >
        {fieldsList.map(renderField)}
      </Grid>

      {children}
    </Grid>
  );
};

export default FormBuilder;
