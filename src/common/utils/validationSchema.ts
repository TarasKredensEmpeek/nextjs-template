import * as yup from 'yup';
import { matchIsValidTel } from 'mui-tel-input';

export const digitRegexp = /^[0-9]+$/;
export const oneDigitRegexp = /(?=.*?[0-9])/;
export const upperCaseRegexp = /(?=.*?[A-Z])/;
export const lowerCaseRegexp = /(?=.*?[a-z])/;
export const specialCharacterRegexp = /(?=.*?[#?!@$%^&*-])/;

export const passwordValidator = yup
  .string()
  .min(8, 'formValidations.minLength')
  .max(64, 'formValidations.maxLength')
  .matches(oneDigitRegexp, 'formValidations.shouldContainOneDigit')
  .matches(lowerCaseRegexp, 'formValidations.shouldContainOneLowercase')
  .matches(upperCaseRegexp, 'formValidations.shouldContainOneUppercase')
  .matches(specialCharacterRegexp, 'formValidations.shouldContainOneSpecial');

const validatePhoneFormat = (value?: string) =>
  value ? matchIsValidTel(value) : true;

export const getNameValidator = (
  spaceMessage = 'formValidations.emptyField',
  requiredMessage = 'formValidations.firstNameRequired',
  required = true,
) => {
  const validator = yup.string().strict().trim(spaceMessage);

  if (required) {
    return validator.required(requiredMessage);
  }

  return validator;
};

export const getPhoneValidator = (
  formatMessage = 'formValidations.phoneFormat',
  requiredMessage = 'formValidations.primaryPhoneRequired',
  required = true,
) => {
  const validator = yup
    .string()
    .test('test-format', formatMessage, validatePhoneFormat);

  if (required) {
    return validator.required(requiredMessage);
  }

  return validator;
};

export const getZipCodeValidator = (
  lengthMessage = 'formValidations.zipCodeLength',
  digitsMessage = 'formValidations.zipCodeOnlyDigits',
  requiredMessage = 'formValidations.zipCodeRequired',
) =>
  yup
    .string()
    .min(5, lengthMessage)
    .max(5, lengthMessage)
    .matches(digitRegexp, digitsMessage)
    .required(requiredMessage);
