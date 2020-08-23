export const capitalize = (string) => {
  let str = string.charAt(0).toUpperCase();
  return str + string.substring(1);
};
