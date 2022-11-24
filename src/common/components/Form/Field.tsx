import React, { FC, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import { Control } from 'react-hook-form';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';

import { FieldComponentProps, FieldParams } from './types';
import TextField from './fields/TextField';

interface FieldProps extends FieldParams {
  index?: number;
  control: Control;
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
  const theme = useTheme();
  const fieldProps = { ...field };
  const FieldComponent = Component || TextField;
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const fieldXs = useMemo(
    () => xs || (getXs && getXs({ isMd })) || defaultFieldXs,
    [defaultFieldXs, getXs, isMd, xs],
  );

  if (hidden) {
    return null;
  }

  if (getOptions) {
    fieldProps.options = getOptions(field.name) as FieldParams['options'];
  }

  if (title) {
    const fieldTitle = t(title).replace('{index}', String(index + 1));

    return Component ? (
      <Component {...(fieldProps as FieldComponentProps)} />
    ) : (
      <Typography
        container
        item
        xs={xs}
        component={Grid}
        variant={titleVariant}
        sx={{ my: 2, ...gridItemSx }}
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
    <Grid item key={field.name} xs={fieldXs} sx={{ my: 1, ...gridItemSx }}>
      <FieldComponent
        {...(fieldProps as FieldComponentProps)}
        control={control}
      />
    </Grid>
  );
};

export default Field;
