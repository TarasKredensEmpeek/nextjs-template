import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import { Control } from 'react-hook-form';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';

import { TField, TFieldOptions } from './types';
import TextField from './fields/TextField';

interface FieldProps extends TField {
  index?: number;
  control: Control;
  getXs?: () => number;
  defaultFieldXs?: number;
}

const Field: FC<FieldProps> = ({
  component: Component,
  xs,
  hidden,
  title,
  index = 0,
  getXs,
  divider,
  control,
  getOptions,
  gridItemSx,
  titleVariant,
  defaultFieldXs,
  ...field
}) => {
  const { t } = useTranslation();
  const fieldProps: TField = { ...field };
  const FieldComponent = Component || TextField;
  const fieldXs = xs || (getXs && getXs()) || defaultFieldXs;

  if (hidden) {
    return null;
  }

  if (getOptions) {
    fieldProps.options = getOptions(field.name) as TFieldOptions;
  }

  if (title) {
    const fieldTitle = t(title).replace('{index}', String(index + 1));

    return Component ? (
      <Component />
    ) : (
      <Typography
        container
        item
        xs={fieldXs}
        component={Grid}
        variant={titleVariant}
        sx={{ margin: '16px 0', ...gridItemSx }}
      >
        {t(fieldTitle)}
      </Typography>
    );
  }

  if (divider) {
    return (
      <Grid item container sx={gridItemSx}>
        <Divider
          style={{ width: '100%', margin: '35px 0' }}
          variant="fullWidth"
        />
      </Grid>
    );
  }

  return (
    <Grid
      item
      key={field.name}
      xs={fieldXs}
      sx={{ margin: '8px 0', ...gridItemSx }}
    >
      <FieldComponent {...fieldProps} size="small" control={control} />
    </Grid>
  );
};

export default Field;
