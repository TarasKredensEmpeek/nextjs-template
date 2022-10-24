import React, { FC, ReactNode, useCallback } from 'react';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { UseFormReturn } from 'react-hook-form';
import { ResponsiveStyleValue } from '@mui/system';
import Grid, { GridSpacing } from '@mui/material/Grid';

import Field from './Field';
import FieldsArray from './FieldsArray';
import { TFieldsModel, TField } from './types';

interface FormBuilderProps<FormDataType = unknown> {
  form: UseFormReturn<object>;
  formStyles?: React.CSSProperties;
  onSubmit: (data: FormDataType) => void;
  children?: ReactNode;
  fieldsList: TFieldsModel;
  submitButtonLabel?: string;
  containerRowSpacing?: ResponsiveStyleValue<GridSpacing>;
  containerColumnSpacing?: ResponsiveStyleValue<GridSpacing>;
  containerSpacing?: ResponsiveStyleValue<GridSpacing>;
  formActions?: React.ElementType;
}

const FormBuilder: FC<FormBuilderProps> = ({
  onSubmit,
  form,
  formStyles,
  fieldsList,
  children = null,
  submitButtonLabel,
  containerRowSpacing,
  containerColumnSpacing,
  containerSpacing,
  formActions: FormActions,
}) => {
  const { t } = useTranslation();
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
    <form noValidate onSubmit={handleSubmit(onSubmit)} style={formStyles}>
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

      {FormActions ? (
        <FormActions onSubmit={handleSubmit(onSubmit)} />
      ) : (
        <Grid
          container
          justifyContent="space-between"
          style={{ marginTop: 40, marginBottom: 80 }}
        >
          <Grid item container wrap="nowrap">
            <Button variant="outlined" onClick={handleSubmit(onSubmit)}>
              {t(submitButtonLabel as string)}
            </Button>
          </Grid>
        </Grid>
      )}
    </form>
  );
};

export default FormBuilder;
