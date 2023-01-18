import path from 'path';
import fs from 'fs';
import getDiff from './getDiff.js';
import parse from './parsers.js';
import format from './formaters/index.js';

const readFile = (filePath) => fs.readFileSync(path.resolve(filePath));

const getData = (filePath) => {
  const formatOfFile = path.extname(filePath).slice(1);
  return parse(readFile(filePath), formatOfFile);
};

const genDiff = (filePath1, filePath2, formater = 'stylish') => {
  const data1 = getData(filePath1);
  const data2 = getData(filePath2);
  const diffTree = getDiff(data1, data2);
  return format(diffTree, formater);
};

export default genDiff;
