// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
export const digitRegexp = /^[0-9]+$/;
export const stringMatchRegExp = /^[A-Za-zÃ‘Ã±0-9. -]*$/;
export const oneDigitRegexp = /(?=.*?[0-9])/;
export const upperCaseRegexp = /(?=.*?[A-Z])/;
export const lowerCaseRegexp = /(?=.*?[a-z])/;
export const specialCharacterRegexp = /(?=.*?[#?!@$%^&*-])/;
