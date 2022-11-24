import * as Yup from 'yup';

import {
  emailSchema,
  passwordValidator,
  getNameValidator,
} from '@common/utils/validationSchema';

export const validationSchemas = Yup.object().shape({
  email: emailSchema,
  confirmEmail: Yup.string()
    .email('fieldValidationMessages.emailInvalid')
    .required('fieldValidationMessages.emailRequired')
    .oneOf([Yup.ref('email'), null], 'fieldValidationMessages.emailIsNotSame'),
  firstName: getNameValidator(),
  lastName: getNameValidator(
    undefined,
    'fieldValidationMessages.lastNameRequired',
  ),
  password: passwordValidator,
  confirmPassword: Yup.string()
    .required('fieldValidationMessages.passwordRequired')
    .oneOf(
      [Yup.ref('password'), null],
      'fieldValidationMessages.passwordIsNotSame',
    ),
  agreePolicy: Yup.bool().oneOf([true], 'fieldValidationMessages.agreePolicy'),
});

export default validationSchemas;
