import { FieldsModel } from '@common/components/Form/types';
import { BooleanField, PasswordField } from '@common/components/Form';

import AcceptingAgreementsLabel from '../components/AcceptingAgreementsLabel';

const getXs = ({ isMd }: { isMd: boolean }) => (isMd ? 12 : 6);

export const createAccountFields = [
  {
    name: 'firstName',
    defaultValue: '',
    placeholder: 'fieldPlaceholders.firstName',
    getXs,
  },
  {
    name: 'lastName',
    defaultValue: '',
    placeholder: 'fieldPlaceholders.lastName',
    getXs,
  },
  {
    name: 'email',
    defaultValue: '',
    placeholder: 'fieldPlaceholders.emailAddress',
    getXs,
  },
  {
    name: 'confirmEmail',
    defaultValue: '',
    placeholder: 'fieldPlaceholders.confirmEmail',
    getXs,
  },
  {
    name: 'password',
    type: 'password',
    defaultValue: '',
    placeholder: 'fieldPlaceholders.password',
    getXs,
    component: PasswordField,
  },
  {
    name: 'confirmPassword',
    defaultValue: '',
    type: 'password',
    placeholder: 'fieldPlaceholders.confirmPassword',
    getXs,
    component: PasswordField,
  },
  {
    xs: 12,
    name: 'agreePolicy',
    component: BooleanField,
    label: AcceptingAgreementsLabel,
    defaultValue: false,
    size: 'small',
    labelVariant: 'caption',
  },
  {
    xs: 12,
    size: 'small',
    name: 'agreeGetUpdates',
    component: BooleanField,
    labelVariant: 'caption',
    label: 'fieldLabels.agreeGetUpdatesLabel',
    defaultValue: false,
  },
] as FieldsModel;
