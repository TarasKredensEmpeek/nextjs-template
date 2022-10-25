import React from 'react';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';

import FormBuilder from '@common/components/Form';
import useCreateAccountFields from '@common/modules/Auth/hooks/useCreateAccountFields';

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

  return (
    <Grid container>
      <Grid container p={3} pb={0}>
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
