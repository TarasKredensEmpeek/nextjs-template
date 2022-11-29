import React, {
  FC,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Control, useController } from 'react-hook-form';

import { useGetData } from '@common/hooks/useRequest';

type OptionKey = string;

interface IResourceSelectProps {
  name: string;
  control: Control;
  onChange?: (e: SyntheticEvent, data: Option | null) => void;
  resource?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  requestParams?: unknown;
  optionLabelName?: OptionKey;
  optionValueName?: OptionKey;
}

interface Option {
  [k: OptionKey]: string | number;
}

const ResourceAutocompleteField: FC<IResourceSelectProps> = ({
  name,
  control,
  onChange,
  resource,
  disabled = false,
  required,
  placeholder,
  defaultValue = undefined,
  requestParams,
  optionValueName = 'id',
  optionLabelName = 'name',
}) => {
  const { t } = useTranslation();
  const [options, setData] = useState<Option[]>([]);

  const req = useGetData<Option[]>(resource as string);
  const [getOptions] = req;

  const { field, fieldState } = useController({ control, name, defaultValue });

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

      if (responseData?.length) {
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

    if (onChange) {
      onChange(e, data);
    }
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
            required={required}
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
