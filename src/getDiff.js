import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getKeys = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(keys);
  return sortedKeys;
};

const getDiff = (data1, data2) => {
  const keys = getKeys(data1, data2);
  const result = keys.map((key) => {
    const val1 = data1[key];
    const val2 = data2[key];
    if (!Object.hasOwn(data1, key)) {
      return {
        name: key,
        status: 'added',
        value1: val2,
        value2,
      };
    } if (!Object.hasOwn(data2, key)) {
      return {
        name: key,
        status: 'deleted',
        value1: val1,
        value2,
      };
    } if (typeof val1 === 'object' && typeof val2 === 'object') {
      return {
        name: key,
        status: 'nested',
        value1: getDiff(data1[key], data2[key]),
        value2,
      };
    } if (data1[key] !== data2[key]) {
      return {
        name: key,
        status: 'changed',
        value1: val1,
        value2: val2,
      };
    }
    return {
      name: key,
      status: 'unchanged',
      value1: val1,
      value2,
    };
  }, {});
  return result;
};

const readFile = (filePath) => fs.readFileSync(path.resolve(filePath));

export { getDiff, readFile };
