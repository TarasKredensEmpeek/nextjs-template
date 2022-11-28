import * as Yup from 'yup';

import { emailSchema, passwordSchema } from '@common/utils/validationSchema';

const validationSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

export default validationSchema;
