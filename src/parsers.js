import yaml from 'js-yaml';
import { readFile } from './getDiff.js';

const jsonParse = (filePath) => JSON.parse(filePath);

const yamlParse = (filePath) => yaml.load(filePath);

const parse = (filePath, format) => {
  const file = readFile(filePath);
  if (format === '.json') {
    return jsonParse(file);
  } if (format === '.yml' || format === '.yaml') {
    return yamlParse(file);
  }
  return 'Error wrong format';
};
export default parse;
