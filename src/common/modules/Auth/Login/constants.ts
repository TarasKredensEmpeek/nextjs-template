import * as Yup from 'yup';

import { FieldsModel } from '@common/components/Form/types';
import { passwordValidator, emailSchema } from '@common/utils/validationSchema';

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
  },
];

export const validationSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordValidator,
});
