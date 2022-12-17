export const capitalize = (str) => {
  if (typeof str !== "string") {
    return "";
  }

  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");
};

// export const removeChar = (str, charToRemove) => {
//   return str.replace(charToRemove, " ");
// };

export const removeChar = (str, charToRemove) => {
  return str?.split(charToRemove).join(" ");
};
