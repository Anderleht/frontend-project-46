import { getDiff } from './getDiff.js';
import stylish from './stylish.js';
import parse from './parsers.js';
import path from 'path';

const genDiff = (filePath1, filePath2, format = 'stylish') => {
	const format1 = path.extname(filePath1);
	const format2 = path.extname(filePath2);
	const firstObject = parse(filePath1, format1);
	const secondObject = parse(filePath2, format2);
	const resultObject = getDiff(firstObject, secondObject);
	if (format === 'stylish') {
		const str = stylish(resultObject);
		console.log(str);
		return str;  
	}
};
export default genDiff;