// Converting the first character in the string to uppercase, leaving the rest as is
export const capitalize = (string) => {
  let str = string.charAt(0).toUpperCase();
  return str + string.substring(1);
};

// Splitting a camelCase two-words-string to a capitalize, space-separated string
export const toSentenceCase = (string) => {
  const index = string.search(/[a-z][A-Z]/);

  if (index < 0) return capitalize(string);

  const ret = `${string.substr(0, index + 1)} ${string.substr(index + 1)}`;
  return capitalize(ret.toLowerCase());
};

// Converts an array with string values to an object with the same fields as the array's values
export const arrayToObject = (arr) => {
  const obj = {};
  for (const key of arr) obj[key] = "";
  return obj;
};
