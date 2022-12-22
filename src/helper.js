import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { jsonParse, yamlParse } from './parsers.js';

const getAndSortKeys = (obj1, obj2) => {
	const keys =  _.union(_.keys(obj1), _.keys(obj2));
	return keys.sort();
};

const getDiff = (data1, data2) => {
	const keys =  getAndSortKeys(data1, data2);
	const result = keys.reduce((acc, key) => {
		if (!Object.hasOwn(data1, key)) {
			acc[key] = 'added';
		} else if (!Object.hasOwn(data2, key)) {
			acc[key] = 'deleted';
		} else if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
			acc[key] = 'nested';
		} else if (data1[key] !== data2[key]) {
			acc[key] = 'changed';
		} else {
			acc[key] = 'unchanged';
		}
		return acc;
	}, {});
	return result;
};

const stylish = (diffObj, data1, data2) => {
	const diffKeys = _.keys(diffObj);
	const result = diffKeys.sort().reduce((acc, key) => {
		if (diffObj[key] === 'nested') {
			acc[key] === getDiff(data1[key], data2[key]);
		} else if (diffObj[key] === 'added') {
			acc[`+ ${key}`] = data2[key];
		} else if (diffObj[key] === 'deleted') {
			acc[`- ${key}`] = data1[key];
		} else if (diffObj[key] === 'changed') {
			acc[`- ${key}`] = data1[key];
			acc[`+ ${key}`] = data2[key];
		} else if (diffObj[key] === 'unchanged') {
			acc[` ${key}`] = data1[key];
		}
		return acc;
	}, {});
	return result;
};


const objToString = (value, replacer = ' ', spacesCount = 1) => {
	const iter = (currentValue, depth) => {
		if (typeof currentValue !== 'object' || currentValue === null) {
			return String(currentValue);
		}
		const indentSize = spacesCount * depth;
		const currentIndent = replacer.repeat(indentSize);
		const bracketIndent = replacer.repeat(indentSize - spacesCount);
  
		const arrValue = Object.entries(currentValue);
		const lines = arrValue.map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);
		const result = ['{', ...lines, `${bracketIndent}}`].join('\n');
  
		return result;
	};
	return iter(value, 1);
};

const readFile = (filePath) => fs.readFileSync(path.resolve(filePath));
const readAndParse = (filePath) => {
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
	const firstObject = readAndParse(filePath1);
	const secondObject = readAndParse(filePath2);
	const resultObject = getDiff(firstObject, secondObject);
	const str = objToString(resultObject);
	console.log(str);
	return str;  
};

export { getDiff, genDiff, objToString};
