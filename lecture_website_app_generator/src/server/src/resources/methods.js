import path from "path";
import fs from "fs";

export const createUserDataDir = (userId) => {
  const dirPath = path.normalize(path.join(__dirname, `../../data/users/${userId}`));

  fs.mkdirSync(dirPath, { recursive: true }, (err) => {
    if (err) {
      console.error('Failed to create directory: ', err);
    }
  });
  return dirPath;
};
