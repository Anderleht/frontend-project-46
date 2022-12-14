import fs from 'fs';
import path from 'path';
import _ from 'lodash';


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

export { getDiff, genDiff, objToString};
