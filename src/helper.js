import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { jsonParse, yamlParse } from './parsers.js';

const getAndSortKeys = (obj1, obj2) => {
	const keys =  _.union(_.keys(obj1), _.keys(obj2));
	return keys.sort();
};

const getDiff = (first, second) => {
	const keys =  getAndSortKeys(first, second);
	const result = keys.reduce((acc, key) => {
		if (Object.hasOwn(first, key) && Object.hasOwn(second, key)) {
			if (first[key] !== second[key]) {
				acc[`- ${key}`] = first[key];
				acc[`+ ${key}`] = second[key];
			} else if (first[key] === second[key]) {
				acc[`  ${key}`] = first[key];
			}
		} else if (Object.hasOwn(first, key) && !Object.hasOwn(second, key)) {
			acc[`- ${key}`] = first[key];
		} else if (!Object.hasOwn(first, key) && Object.hasOwn(second, key)) {
			acc[`+ ${key}`] = second[key];
		}
		return acc;
	}, {});
	return result;
};
const objToString = (object) => {
	const newArr = Object.entries(object);
	const str = `{
${newArr.join('\n')}
}`;
	const replacer = /,/g;
	const fixedStr = str.replace(replacer, ': ');
	return fixedStr;
};

const readFile = (filePath) => fs.readFileSync(path.resolve(filePath));
const getParse = (filePath) => {
	const format = path.extname(filePath);
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
 
const genDiff = (filePath1, filePath2) => {
	const firstObject = getParse(filePath1);
	const secondObject = getParse(filePath2);
	const resultObject = getDiff(firstObject, secondObject);
	const str = objToString(resultObject);
	console.log(str);
	return str;  
};

export { getDiff, genDiff, objToString};
