import path from 'path';
import { getDiff } from './getDiff';
import parse from './parsers';
import getFormat from './formaters/index';

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const format1 = path.extname(filePath1);
  const format2 = path.extname(filePath2);
  const firstObject = parse(filePath1, format1);
  const secondObject = parse(filePath2, format2);
  const resultObject = getDiff(firstObject, secondObject);
  return getFormat(resultObject, format);
};
export default genDiff;
