import * as Yup from 'yup';
import { matchIsValidTel } from 'mui-tel-input';

export const digitRegexp = /^[0-9]+$/;
export const oneDigitRegexp = /(?=.*?[0-9])/;
export const upperCaseRegexp = /(?=.*?[A-Z])/;
export const lowerCaseRegexp = /(?=.*?[a-z])/;
export const specialCharacterRegexp = /(?=.*?[#?!@$%^&*-])/;

export const emailSchema = Yup.string()
  .email('fieldValidationMessages.emailInvalid')
  .required('fieldValidationMessages.emailRequired');

export const passwordValidator = Yup.string()
  .min(8, 'fieldValidationMessages.minLength')
  .max(64, 'fieldValidationMessages.maxLength')
  .matches(oneDigitRegexp, 'fieldValidationMessages.shouldContainOneDigit')
  .matches(lowerCaseRegexp, 'fieldValidationMessages.shouldContainOneLowercase')
  .matches(upperCaseRegexp, 'fieldValidationMessages.shouldContainOneUppercase')
  .matches(
    specialCharacterRegexp,
    'fieldValidationMessages.shouldContainOneSpecial',
  );

const validatePhoneFormat = (value?: string) =>
  value ? matchIsValidTel(value) : true;

export const getNameValidator = (
  spaceMessage = 'fieldValidationMessages.emptyField',
  requiredMessage = 'fieldValidationMessages.firstNameRequired',
  required = true,
) => {
  const validator = Yup.string().strict().trim(spaceMessage);

  if (required) {
    return validator.required(requiredMessage);
  }

  return validator;
};

export const getPhoneValidator = (
  formatMessage = 'fieldValidationMessages.phoneFormat',
  requiredMessage = 'fieldValidationMessages.primaryPhoneRequired',
  required = true,
) => {
  const validator = Yup.string().test(
    'test-format',
    formatMessage,
    validatePhoneFormat,
  );

  if (required) {
    return validator.required(requiredMessage);
  }

  return validator;
};

export const getZipCodeValidator = (
  lengthMessage = 'fieldValidationMessages.zipCodeLength',
  digitsMessage = 'fieldValidationMessages.zipCodeOnlyDigits',
  requiredMessage = 'fieldValidationMessages.zipCodeRequired',
) =>
  Yup.string()
    .min(5, lengthMessage)
    .max(5, lengthMessage)
    .matches(digitRegexp, digitsMessage)
    .required(requiredMessage);
