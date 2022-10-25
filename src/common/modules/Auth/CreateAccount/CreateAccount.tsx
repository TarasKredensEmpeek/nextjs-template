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

  const { handleSubmit } = form;

  const onSubmit = () => null;

  const fields = useCreateAccountFields();

  const openLogin = () => openModal(ModalNames.auth, { view: AuthViews.login });

  return (
    <Grid container>
      <Typography variant="body1" textAlign="center" mx={3}>
        {t('createAccountSubtitle')}
      </Typography>

      <Link
        mx={3}
        width="100%"
        variant="body1"
        textAlign="center"
        underline="none"
        onClick={openLogin}
      >
        {t('createAccountLink')}
      </Link>

      <Grid container px={3}>
        <FormBuilder
          onSubmit={onSubmit}
          form={form}
          fieldsList={fields}
          containerColumnSpacing={4}
        />
      </Grid>

      <Grid container sx={{ px: 3, pb: 3 }}>
        <Button fullWidth variant="outlined" onClick={handleSubmit(onSubmit)}>
          {t('createAccount')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateAccount;
