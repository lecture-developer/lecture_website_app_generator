export const capitalize = (string) => {
  let str = string.charAt(0).toUpperCase();
  return str + string.substring(1);
};

export const arrayToObject = (arr) => {
  const obj = {};
  for (const key of arr) obj[key] = "";
  return obj;
};
