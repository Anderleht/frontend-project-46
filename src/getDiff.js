import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getKeys = (obj1, obj2) => {
	const keys =  _.union(_.keys(obj1), _.keys(obj2));
	return keys.sort();
};
const createInitTree = (name, status = '', value = '', value2 = '') => ({
	name,
	status,
	value,
	value2
});

const getDiff = (data1, data2) => {
	const keys =  getKeys(data1, data2);
	const result = keys.reduce((acc, key) => {
		const val1 = data1[key];
		const val2 = data2[key];
		const node = createInitTree(key);
		if (!Object.hasOwn(data1, key)) {
			node.status = 'added';
			node.value = val2;
			acc[key] = node;
		} else if (!Object.hasOwn(data2, key)) {
			node.status = 'deleted';
			node.value = val1;
			acc[key] = node;
		} else if (typeof val1 === 'object' && typeof val2 === 'object') {
			node.status = 'nested';
			node.value = getDiff(data1[key], data2[key]);
			acc[key] = node;
		} else if (data1[key] !== data2[key]) {
			node.status = 'changed';
			node.value = val1;
			node.value2 = val2;
			acc[key] = node;
		} else {
			node.status = 'unchanged';
			node.value = val1;
			acc[key] = node;
		}
		return acc;
	}, {});
	return result;
};


const readFile = (filePath) => fs.readFileSync(path.resolve(filePath));
 


export { getDiff, readFile};
