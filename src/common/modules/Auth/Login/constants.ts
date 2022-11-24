import { PasswordField } from '@common/components/Form';
import { FieldsModel } from '@common/components/Form/types';

export const formModel: FieldsModel = [
  {
    name: 'email',
    defaultValue: '',
    placeholder: 'fieldPlaceholders.email',
    xs: 12,
  },
  {
    name: 'password',
    defaultValue: '',
    placeholder: 'fieldPlaceholders.password',
    xs: 12,
    component: PasswordField,
  },
];
