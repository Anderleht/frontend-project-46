import yaml from 'js-yaml';
import { readFile } from './getDiff.js';

const jsonParse = (filePath) => JSON.parse(filePath);

const yamlParse = (filePath) => yaml.load(filePath);

const parse = (filePath, format) => {
	const file = readFile(filePath);
	let result;
	if (format === '.json') {
		result = jsonParse(file);
		return result;       
	} else if (format === '.yml' || format === '.yaml') {
		result = yamlParse(file);
		return result;
	}
};
export default parse;