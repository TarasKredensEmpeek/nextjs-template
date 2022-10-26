import React, { FC, useCallback } from 'react';
import { Control } from 'react-hook-form';
import { SxProps } from '@mui/material/styles';
import { ResponsiveStyleValue } from '@mui/system';
import Grid, { GridSpacing } from '@mui/material/Grid';

import Field from './Field';
import FieldsArray from './FieldsArray';
import { FieldsModel, TField } from './types';

interface FormBuilderProps {
  control: Control;
  formSx?: SxProps;
  children?: React.ReactNode;
  fieldsList: FieldsModel;
  submitButtonLabel?: string;
  containerRowSpacing?: ResponsiveStyleValue<GridSpacing>;
  containerColumnSpacing?: ResponsiveStyleValue<GridSpacing>;
  containerSpacing?: ResponsiveStyleValue<GridSpacing>;
  formActions?: React.ElementType;
}

const FormBuilder: FC<FormBuilderProps> = ({
  control,
  formSx = {},
  fieldsList,
  children = null,
  containerRowSpacing,
  containerColumnSpacing,
  containerSpacing,
}) => {
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
    <Grid container sx={formSx}>
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
