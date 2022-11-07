import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { yupResolver } from '@hookform/resolvers/yup';

import FormBuilder from '@common/components/Form';
import useCreateAccountFields from '@common/modules/Auth/hooks/useCreateAccountFields';
import { openModal } from '@common/utils/eventEmitter';
import { AuthViews, ModalNames } from '@common/constants/enums';

import { validationSchemas } from './constants';

const CreateAccount = () => {
  const { t } = useTranslation(['auth']);
  const form = useForm({
    resolver: yupResolver(validationSchemas),
    reValidateMode: 'onChange',
    mode: 'all',
  });

  const { handleSubmit, control } = form;

  const onSubmit = () => null;

  const fields = useCreateAccountFields();

  const openLogin = () => openModal(ModalNames.auth, { view: AuthViews.login });
  const openCreateAgencyAccount = () =>
    openModal(ModalNames.auth, { view: AuthViews.createAgencyAccount });

  return (
    <Grid container>
      <Typography variant="body2" textAlign="center" mx={4.5}>
        {t('createAccountSubtitle')}
      </Typography>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container px={3}>
          <FormBuilder
            control={control}
            fieldsList={fields}
            containerColumnSpacing={4}
          />
        </Grid>

        <Grid container px={4.5} pt={1.5}>
          <Button fullWidth variant="contained" type="submit">
            {t('createAccount')}
          </Button>
        </Grid>

        <Grid container justifyContent="center" px={4.5} pt={1.5}>
          <Button variant="text" color="secondary" onClick={openLogin}>
            {t('login')}
          </Button>
        </Grid>

        <Divider sx={{ my: 3 }} variant="fullWidth" />

        <Grid container sx={{ px: 4.5, pb: 4 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={openCreateAgencyAccount}
          >
            {t('createAgencyAccount')}
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default CreateAccount;
