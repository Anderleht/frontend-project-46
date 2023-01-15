import path from 'path';
import { getDiff, readFile } from './getDiff.js';
import parse from './parsers.js';
import getFormat from './formaters/index.js';

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const format1 = path.extname(filePath1);
  const format2 = path.extname(filePath2);
  const firstFile = parse(readFile(filePath1), format1);
  const secondFile = parse(readFile(filePath2), format2);
  const diffTree = getDiff(firstFile, secondFile);
  return getFormat(diffTree, format);
};
export default genDiff;
