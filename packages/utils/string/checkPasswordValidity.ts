import {
  digitRegex,
  lowercaseRegex,
  maxIdenticalCharsRegex,
  minLengthRegex,
  specialCharRegex,
  uppercaseRegex,
} from '../regex';

type PasswordValidationResponse = {
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasDigit: boolean;
  hasSpecialChar: boolean;
  isMinLength: boolean;
  hasMaxIdenticalChars: boolean;
  result: boolean;
};

const checkPasswordValidity = (
  password: string
): PasswordValidationResponse => {
  const minLength = 10;
  const maxIdenticalChars = 2;

  const validationResponse: PasswordValidationResponse = {
    hasUppercase: uppercaseRegex.test(password),
    hasLowercase: lowercaseRegex.test(password),
    hasDigit: digitRegex.test(password),
    hasSpecialChar: specialCharRegex.test(password),
    isMinLength: minLengthRegex(minLength).test(password),
    hasMaxIdenticalChars:
      !maxIdenticalCharsRegex(maxIdenticalChars).test(password),
    result: false, // Initialize the result as false
  };

  // Check if all validation criteria are met
  const isPasswordValid =
    validationResponse.hasUppercase &&
    validationResponse.hasSpecialChar &&
    validationResponse.hasDigit &&
    validationResponse.hasLowercase &&
    validationResponse.isMinLength &&
    validationResponse.hasMaxIdenticalChars;

  validationResponse.result = isPasswordValid; // Set result based on overall validity

  return validationResponse;
};

export { checkPasswordValidity, type PasswordValidationResponse };
