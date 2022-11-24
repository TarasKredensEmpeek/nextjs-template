import React, {
  FC,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Control, useController } from 'react-hook-form';

import { useGetData } from '@common/hooks/useRequest';

import useStyles from './useStyles';

type OptionKey = string;

interface IResourceSelectProps {
  name: string;
  control: Control;
  resource?: string;
  optionLabelName: OptionKey;
  placeholder?: string;
  optionValueName: OptionKey;
  requestParams?: unknown;
  withBorder?: boolean;
  boldInputText?: boolean;
  disabled: boolean;
  required: boolean;
  defaultValue: string;
}

interface Option {
  [k: OptionKey]: string | number;
}

const ResourceAutocompleteField: FC<IResourceSelectProps> = ({
  name,
  required,
  placeholder,
  resource,
  requestParams,
  disabled = false,
  withBorder = false,
  boldInputText = true,
  optionValueName = 'id',
  optionLabelName = 'name',
  defaultValue = undefined,
  control,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [options, setData] = useState<Option[]>([]);

  const req = useGetData<Option[]>(resource as string);
  const [getOptions] = req;

  const { field, fieldState } = useController({ control, name, defaultValue });

  const inputClasses = {
    root: classes.root,
    input: classes.input,
    inputRoot: clsx(classes.inputRoot, {
      [classes.withBorder]: withBorder,
      [classes.boldInputText]: boldInputText,
    }),
    error: classes.error,
    focused: classes.inputFocused,
  };

  const { error } = fieldState;
  const isError = useMemo(() => Boolean(error), [error]);
  const errorMessage = useMemo(() => error?.message || '', [error?.message]);

  const fieldPlaceholder = useMemo(() => {
    const p = placeholder && t(placeholder);

    if (!placeholder) {
      return '';
    }

    return required ? `${p} *` : p;
  }, [placeholder, required, t]);

  const getDataForOptions = useCallback(async () => {
    if (!resource) {
      setData([]);
      return;
    }

    try {
      const responseData = await getOptions(requestParams);

      if (!!responseData?.length) {
        setData(responseData);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }, [resource, getOptions, requestParams]);

  useEffect(() => {
    getDataForOptions();
  }, [getDataForOptions]);

  const handleChange = (e: SyntheticEvent, data: Option | null) => {
    field.onChange(data?.[optionValueName] || data);
  };

  const computedValue = useMemo(() => {
    if (!field.value || !options) {
      return null;
    }

    return (
      options.find(
        o =>
          o?.[optionValueName] ===
          (field.value?.[optionValueName] || field.value),
      ) || null
    );
  }, [optionValueName, options, field.value]);

  return (
    <div style={{ position: 'relative' }}>
      <Autocomplete
        fullWidth
        id={name}
        size="small"
        value={computedValue}
        options={options}
        classes={inputClasses}
        onChange={handleChange}
        disabled={disabled}
        getOptionLabel={option =>
          String(option ? option?.[optionLabelName] || option : '')
        }
        isOptionEqualToValue={(option, value) =>
          option?.[optionValueName] === (value?.[optionValueName] || value)
        }
        renderInput={params => (
          <TextField
            {...params}
            error={isError}
            inputRef={field.ref}
            helperText={errorMessage && t(errorMessage)}
            placeholder={fieldPlaceholder}
          />
        )}
      />
    </div>
  );
};

export default ResourceAutocompleteField;
