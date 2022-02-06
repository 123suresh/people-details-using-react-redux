import { emailRegex, onlyNumberRegex } from "./regex";
export const maxLengthCheck = (value, maxLength) => {
  return value.length < maxLength && onlyNumberRegex.test(value);
};
