import React, {
  FC,
  Fragment,
  memo,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { useFieldArray, useWatch, Control } from 'react-hook-form';

import { FieldsModel, TField } from './types';
import Field from './Field';

interface FieldsArrayProps extends TField {
  fields: FieldsModel;
  control: Control;
  fieldIndex?: number;
}

const excludedFieldNames = ['divider', 'title', 'label'];

const FieldsArray: FC<FieldsArrayProps> = ({
  name,
  label,
  control,
  fields,
  fieldIndex,
  labelVariant,
  countFieldName,
  fieldArrayHelpers = {},
}) => {
  const { t } = useTranslation();

  const countFieldNameArray = useMemo(
    () =>
      countFieldName &&
      countFieldName
        .split(', ')
        .map(cF => cF.replace('{index}', `${fieldIndex}`)),
    [countFieldName, fieldIndex],
  );

  const countOfFields = useWatch({
    control,
    name: countFieldNameArray as string[],
  });

  const fieldArrayParams = useFieldArray({ name, control });
  const { fields: fieldsArray, append, remove } = fieldArrayParams;

  const {
    getNewFieldsForFieldsArray,
    getFieldsArrayIndexToRemove,
    getFieldsForFieldsArrayToCompare,
  } = fieldArrayHelpers;

  const updateFieldArray = useCallback(
    (count: number, counterField?: string) => {
      if (typeof counterField === 'undefined') {
        return;
      }

      const currentTypeOfFieldArray = getFieldsForFieldsArrayToCompare
        ? getFieldsForFieldsArrayToCompare(fieldsArray, counterField)
        : fieldsArray;

      const isNewShouldBeAdded =
        count > currentTypeOfFieldArray.length && count > 0;

      if (isNewShouldBeAdded) {
        const newFieldsForArray = fields.reduce(
          (acc, f) =>
            excludedFieldNames.includes(f.name)
              ? acc
              : {
                  ...acc,
                  [f.name]:
                    typeof f.defaultValue !== undefined ? f.defaultValue : '',
                },
          {},
        );

        const fieldsToAdd = getNewFieldsForFieldsArray
          ? getNewFieldsForFieldsArray(newFieldsForArray, counterField)
          : newFieldsForArray;

        append(fieldsToAdd, { shouldFocus: false });
      }

      const isLastShouldBeRemoved = count < currentTypeOfFieldArray.length;

      if (isLastShouldBeRemoved) {
        const indexToRemove = getFieldsArrayIndexToRemove
          ? getFieldsArrayIndexToRemove(fieldsArray, counterField)
          : fieldsArray.length - 1;
        remove(indexToRemove);
      }
    },
    [
      fields,
      append,
      remove,
      fieldsArray,
      getNewFieldsForFieldsArray,
      getFieldsArrayIndexToRemove,
      getFieldsForFieldsArrayToCompare,
    ],
  );

  const handleChangeFieldArray = useCallback(() => {
    if (Array.isArray(countOfFields) && Array.isArray(countFieldNameArray)) {
      // make updates for each of countFieldName separately
      countOfFields.forEach((count, idx) => {
        const counterField = countFieldNameArray[idx];

        updateFieldArray(count, counterField);
      });
    }
  }, [updateFieldArray, countOfFields, countFieldNameArray]);

  useEffect(() => {
    handleChangeFieldArray();
  }, [handleChangeFieldArray]);

  return (
    <>
      {fieldsArray.map((f, index) => {
        const groupLabel = label
          ? t(label as string).replace('{index}', String(index + 1))
          : undefined;

        return (
          <Fragment key={f.id}>
            {!!groupLabel && (
              <Typography
                container
                component={Grid}
                variant={labelVariant}
                style={{ margin: '16px 0' }}
              >
                {groupLabel}
              </Typography>
            )}

            {fields.map(field => {
              const key = f.id + field.name;
              const fieldName = `${name}.${index}.${field.name}`;

              if (field.fields?.length) {
                // specified few countFieldNames to manipulate array of fields in different ways
                return (
                  <FieldsArray
                    fieldIndex={index}
                    key={key}
                    control={control}
                    {...field}
                    name={fieldName}
                    fields={field.fields}
                  />
                );
              }

              return (
                <Field
                  {...field}
                  key={fieldName}
                  control={control}
                  name={fieldName}
                  index={index}
                  title={field.getTitle ? field.getTitle(f) : field.title}
                />
              );
            })}
          </Fragment>
        );
      })}
    </>
  );
};

const areEqual = (prev: FieldsArrayProps, next: FieldsArrayProps) =>
  prev.name === next.name &&
  prev.fields === next.fields &&
  prev.control === next.control &&
  prev.countFieldName === next.countFieldName &&
  prev.fieldArrayHelpers === next.fieldArrayHelpers;

export default memo(FieldsArray, areEqual);
