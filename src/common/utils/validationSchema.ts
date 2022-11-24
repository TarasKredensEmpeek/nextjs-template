import * as Yup from 'yup';
import { matchIsValidTel } from 'mui-tel-input';

import {
  digitRegexp,
  oneDigitRegexp,
  lowerCaseRegexp,
  upperCaseRegexp,
  stringMatchRegExp,
  specialCharacterRegexp,
} from '@common/constants/regExp';

export const emailSchema = Yup.string()
  .email('fieldValidationMessages.emailInvalid')
  .required('fieldValidationMessages.emailRequired');

export const validatePhoneFormat = (value?: string | null) =>
  value ? matchIsValidTel(value) : true;

export const createStringValidCharacters = (
  message = 'formValidations.invalidCharacters',
) =>
  Yup.string()
    .strict()
    .trim('formValidations.whitespace')
    .matches(stringMatchRegExp, message);

export const firstName = createStringValidCharacters().required(
  'formValidations.firstNameRequired',
);

export const lastName = createStringValidCharacters().required(
  'formValidations.lastNameRequired',
);

export const getNameValidator = (
  requiredMessage = 'fieldValidationMessages.firstNameRequired',
  required = true,
) => {
  const validator = createStringValidCharacters();

  if (required) {
    return validator.required(requiredMessage);
  }

  return validator;
};

export const primaryPhone = Yup.string()
  .nullable()
  .test('test-format', 'formValidations.phoneFormat', validatePhoneFormat)
  .required('formValidations.primaryPhoneRequired');
export const mobilePhone = Yup.string()
  .nullable()
  .test('test-format', 'formValidations.phoneFormat', validatePhoneFormat);

export const zipCode = Yup.string()
  .nullable()
  .min(5, 'formValidations.zipCodeLength')
  .max(5, 'formValidations.zipCodeLength')
  .matches(digitRegexp, 'formValidations.zipCodeOnlyDigits')
  .required('formValidations.zipCodeRequired');

export const passwordSchema = Yup.string()
  .min(8, 'formValidations.minLength')
  .max(64, 'formValidations.maxLength')
  .matches(oneDigitRegexp, 'formValidations.shouldContainOneDigit')
  .matches(lowerCaseRegexp, 'formValidations.shouldContainOneLowercase')
  .matches(upperCaseRegexp, 'formValidations.shouldContainOneUppercase')
  .matches(specialCharacterRegexp, 'formValidations.shouldContainOneSpecial');

export const addressSchema = Yup.object({
  holderFirstName: firstName.nullable(),
  holderLastName: lastName.nullable(),
  primaryPhone,
  mobilePhone,
  address: createStringValidCharacters()
    .nullable()
    .strict()
    .trim('formValidations.whitespace')
    .required('formValidations.addressLine1Required'),
  address2: createStringValidCharacters().nullable(),
  countryId: Yup.number()
    .nullable()
    .required('formValidations.countryRequired'),
  stateId: Yup.number().nullable().required('formValidations.stateRequired'),
  city: createStringValidCharacters().required('formValidations.cityRequired'),
  zipCode,
});
