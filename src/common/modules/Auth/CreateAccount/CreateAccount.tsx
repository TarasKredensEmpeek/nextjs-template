import React from 'react';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
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

  return (
    <Grid container>
      <Typography variant="body1" textAlign="center" mx={3}>
        {t('createAccountSubtitle')}
      </Typography>

      <Grid container justifyContent="center">
        <Link mx={3} variant="body1" onClick={openLogin}>
          {t('createAccountLink')}
        </Link>
      </Grid>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container px={3}>
          <FormBuilder
            control={control}
            fieldsList={fields}
            containerColumnSpacing={4}
          />
        </Grid>

        <Grid container sx={{ px: 3, pb: 3 }}>
          <Button fullWidth variant="outlined" type="submit">
            {t('createAccount')}
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default CreateAccount;
