import path from 'path';
import { getDiff, readFile } from './getDiff.js';
import parse from './parsers.js';
import getFormat from './formaters/index.js';

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const format1 = path.extname(filePath1);
  const format2 = path.extname(filePath2);
  const firstObject = parse(readFile(filePath1), format1);
  const secondObject = parse(readFile(filePath2), format2);
  const resultObject = getDiff(firstObject, secondObject);
  return getFormat(resultObject, format);
};
export default genDiff;
