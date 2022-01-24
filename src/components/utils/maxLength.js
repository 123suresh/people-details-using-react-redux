import { onlyNumberRegex } from "./regex";
const maxLengthCheck = (value, maxLength) => {
  return value.length < maxLength && onlyNumberRegex.test(value);
};

export default maxLengthCheck;
