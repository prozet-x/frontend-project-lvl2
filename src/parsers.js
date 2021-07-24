import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

export default (filePath) => {
  if ((path.extname(filePath) === '.yml') || (path.extname(filePath) === '.yaml')) {
    return yaml.load(fs.readFileSync(filePath, 'utf8'));
  }
  if (path.extname(filePath) === '.json') {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return 'unexpected format of file';
};
