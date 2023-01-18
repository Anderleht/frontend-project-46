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
        value: val2,
      };
    } if (!Object.hasOwn(data2, key)) {
      return {
        name: key,
        status: 'deleted',
        value: val1,
      };
    } if (_.isPlainObject(val1) && _.isPlainObject(val2)) {
      return {
        name: key,
        status: 'nested',
        children: getDiff(data1[key], data2[key]),
      };
    } if (!_.isEqual(data1[key], data2[key])) {
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
      value: val1,
    };
  }, {});
  return result;
};

export default getDiff;
