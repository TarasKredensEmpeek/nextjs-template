import * as Yup from 'yup';

import {
  emailSchema,
  passwordSchema,
  getNameValidator,
} from '@common/utils/validationSchema';

const validationSchemas = Yup.object().shape({
  email: emailSchema,
  confirmEmail: Yup.string()
    .email('fieldValidationMessages.emailInvalid')
    .required('fieldValidationMessages.emailRequired')
    .oneOf([Yup.ref('email'), null], 'fieldValidationMessages.emailIsNotSame'),
  firstName: getNameValidator(),
  lastName: getNameValidator('fieldValidationMessages.lastNameRequired'),
  password: passwordSchema,
  confirmPassword: Yup.string()
    .required('fieldValidationMessages.passwordRequired')
    .oneOf(
      [Yup.ref('password'), null],
      'fieldValidationMessages.passwordIsNotSame',
    ),
  agreePolicy: Yup.bool().oneOf([true], 'fieldValidationMessages.agreePolicy'),
});

export default validationSchemas;
