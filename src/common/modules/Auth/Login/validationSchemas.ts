import * as Yup from 'yup';

import { emailSchema, passwordValidator } from '@common/utils/validationSchema';

export const validationSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordValidator,
});

export default validationSchema;
