import yaml from 'js-yaml';

const jsonParse = (filePath) => JSON.parse(filePath);

const yamlParse = (filePath) => yaml.load(filePath);

const parse = (file, format) => {
  if (format === '.json') {
    return jsonParse(file);
  } if (format === '.yml' || format === '.yaml') {
    return yamlParse(file);
  }
  throw new Error(`Wrong format: ${format}`);
};
export default parse;
