import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';

import { BooleanField } from '@common/components/Form';
import { FieldsModel } from '@common/components/Form/types';

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
      // label: (
      //   <Trans i18nKey="fieldPlaceholders.agreePolicy">
      //   <Link to="/purchase-policy" />
      //   <Link to="/privacy-policy" />
      //   <Link to="/terms-of-use" />
      //     </Trans>
      // ),
      defaultValue: false,
      gridItemSx: { paddingTop: '10px', color: '#585E5F' },
    },
  ] as FieldsModel;
};

export default useCreateAccountFields;
