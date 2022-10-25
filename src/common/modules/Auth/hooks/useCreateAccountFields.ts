import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';

import { BooleanField } from '@common/components/Form';
import { FieldsModel } from '@common/components/Form/types';

import AcceptingAgreementsLabel from '../components/AcceptingAgreementsLabel';

const useCreateAccountFields = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  return [
    {
      name: 'firstName',
      defaultValue: '',
      placeholder: 'fieldPlaceholders.firstName',
      xs: isMd ? 12 : 6,
    },
    {
      name: 'lastName',
      defaultValue: '',
      placeholder: 'fieldPlaceholders.lastName',
      xs: isMd ? 12 : 6,
    },
    {
      name: 'email',
      defaultValue: '',
      placeholder: 'fieldPlaceholders.emailAddress',
      xs: isMd ? 12 : 6,
    },
    {
      name: 'confirmEmail',
      defaultValue: '',
      placeholder: 'fieldPlaceholders.confirmEmail',
      xs: isMd ? 12 : 6,
    },
    {
      name: 'password',
      type: 'password',
      defaultValue: '',
      placeholder: 'fieldPlaceholders.password',
      xs: isMd ? 12 : 6,
    },
    {
      name: 'confirmPassword',
      defaultValue: '',
      type: 'password',
      placeholder: 'fieldPlaceholders.confirmPassword',
      xs: isMd ? 12 : 6,
    },
    {
      xs: 12,
      name: 'agreePolicy',
      component: BooleanField,
      label: AcceptingAgreementsLabel,
      defaultValue: false,
    },
  ] as FieldsModel;
};

export default useCreateAccountFields;
