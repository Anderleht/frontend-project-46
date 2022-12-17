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
 
const genDiff = (filepath1, filepath2) => {
	let firstObject;
	let secondObject;
	const firstEnder = path.extname(filepath1);
	const secondEnder = path.extname(filepath2);
	if (firstEnder === '.json') {
		firstObject = jsonParse(readFile(filepath1));       
	} else if (firstEnder === '.yml' || firstEnder === '.yaml') {
		firstObject = yamlParse(readFile(filepath1));
	}
	if (secondEnder === '.json') {
		secondObject = jsonParse(readFile(filepath2));   
	} else if (secondEnder === '.yml' || secondEnder === '.yaml') {
		secondObject = yamlParse(readFile(filepath2));
	}
	const resultObject = getDiff(firstObject, secondObject);
	const str = objToString(resultObject);
	console.log(str,);
	return str;  
};

export { getDiff, genDiff, objToString};
