import React from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { FieldValues, useForm } from 'react-hook-form';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { yupResolver } from '@hookform/resolvers/yup';

import apiUrls from '@common/constants/apiUrls';
import FormBuilder from '@common/components/Form';
import { usePostData } from '@common/hooks/useRequest';
import { AuthViews, ModalNames } from '@common/constants/enums';
import { openModal, closeModal } from '@common/utils/eventEmitter';

import { formModel, validationSchema } from './constants';

const Login = () => {
  const [handleLogin] = usePostData(apiUrls.login);

  const { t } = useTranslation(['auth']);
  const form = useForm<FieldValues>({
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onChange',
    mode: 'all',
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (d: FieldValues) => {
    await handleLogin(d);
    closeModal();
  };

  const openCreateAccount = () =>
    openModal(ModalNames.auth, { view: AuthViews.createAccount });

  const openForgotPassword = () =>
    openModal(ModalNames.auth, { view: AuthViews.forgotPassword });

  return (
    <Grid container>
      <Typography variant="body1" textAlign="center" sx={{ mx: 3 }}>
        {t('loginSubtitle')}
      </Typography>

      <Grid
        container
        noValidate
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container px={3}>
          <FormBuilder control={control} fieldsList={formModel} />
        </Grid>

        <Grid item container direction="column">
          <Grid container>
            <Link px={3} variant="body1" onClick={openForgotPassword}>
              {t('forgotPassword')}
            </Link>
          </Grid>

          <Grid sx={{ px: 3 }}>
            <Button fullWidth type="submit" variant="contained">
              {t('login')}
            </Button>
          </Grid>

          <Divider sx={{ my: 3 }} variant="fullWidth" />

          <Grid sx={{ px: 3, pb: 3 }}>
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
