import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import Divider from '@mui/material/Divider';

import FormBuilder from '@common/components/Form';

import { validationSchema, formModel } from './constants';

const Login = () => {
  const { t } = useTranslation(['auth']);
  const form = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange',
    mode: 'all',
  });

  const { handleSubmit } = form;

  const onSubmit = () => null;

  return (
    <Grid container>
      <Grid container p={3} pb={0}>
        <FormBuilder form={form} onSubmit={onSubmit} fieldsList={formModel} />
      </Grid>

      <Grid item container direction="column">
        <Grid sx={{ px: 3 }}>
          <Button fullWidth variant="outlined" onClick={handleSubmit(onSubmit)}>
            {t('login')}
          </Button>
        </Grid>

        <Divider sx={{ my: 3 }} variant="fullWidth" />

        <Grid sx={{ px: 3, pb: 3 }}>
          <Button fullWidth variant="outlined">
            {t('createAccount')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
