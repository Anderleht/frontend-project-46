import yaml from 'js-yaml';

const jsonParse = (filePath) => JSON.parse(filePath);

const yamlParse = (filePath) => yaml.load(filePath);
export  { jsonParse, yamlParse };