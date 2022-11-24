import React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FieldValues } from 'react-hook-form';

import { AuthLoginData } from '@/types/auth';
import FormBuilder from '@common/components/Form';
import { Button } from '@common/components/buttons';
import useAuthProvider from '@common/hooks/useAuthProvider';
import { AuthViews, ModalNames } from '@common/constants/enums';
import { openModal, closeModal } from '@common/utils/eventEmitter';

import { formModel } from './constants';
import validationSchema from './validationSchemas';

const Login = () => {
  const { login, loading } = useAuthProvider();

  const { t } = useTranslation(['auth']);
  const form = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange',
    mode: 'all',
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (d: FieldValues) => {
    await login(d as AuthLoginData);
    closeModal();
  };

  const openCreateAccount = () =>
    openModal(ModalNames.auth, { view: AuthViews.createAccount });

  const openForgotPassword = () =>
    openModal(
      ModalNames.auth,
      { view: AuthViews.forgotPassword },
      undefined,
      'sm',
    );

  return (
    <Grid container>
      <Typography variant="body2" textAlign="center" sx={{ mx: 4.5 }}>
        {t('loginSubtitle')}
      </Typography>

      <Grid
        container
        noValidate
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container px={4.5} pt={4}>
          <FormBuilder control={control} fieldsList={formModel} />
        </Grid>

        <Grid item container direction="column" sx={{ pt: 3.75 }}>
          <Grid container justifyContent="center" px={4.5}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              loading={loading}
            >
              {t('login')}
            </Button>

            <Button
              sx={{ mt: 1.5 }}
              variant="text"
              color="secondary"
              onClick={openForgotPassword}
            >
              {t('forgotPassword')}
            </Button>
          </Grid>

          <Divider sx={{ my: 3 }} variant="fullWidth" />

          <Grid sx={{ px: 4.5, pb: 5 }}>
            <Button fullWidth variant="outlined" onClick={openCreateAccount}>
              {t('createAccount')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
