#!/usr/bin/env node
import _ from 'lodash';
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

const program = new Command();

const getDiff = (first, second) => {
	const keys =  _.union(_.keys(first), _.keys(second));
	const result = keys.sort().reduce((acc, key) => {
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
	const re = /,/g;
	const fixedStr = str.replace(re, ': ');
	return fixedStr;
};
const genDiff = (filepath1, filepath2) => {
	const firstObject = JSON.parse(fs.readFileSync(path.resolve(filepath1)));       
	const secondObject = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
	const resultObject = getDiff(firstObject, secondObject);
	const str = objToString(resultObject);
	console.log(str);  
};

program
	.name('gendiff')
	.description('Compares two configuration files and shows a difference.')
	.version('1.0.0')
	.option('-f, --format <type>', 'output format')
	.arguments('<filepath1>', 'path to first file')
	.arguments('<filepath2>', 'path to second file')
	.action(genDiff)
	.parse();
