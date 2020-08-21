import path from 'path';

export const createJsonFilePath = (fileName) => {
  if (!fileName.endsWith('.json')) fileName += '.json';
  return path.normalize(path.join(__dirname, `../../data/${fileName}`));
};