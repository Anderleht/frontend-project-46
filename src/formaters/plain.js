const getType = (type) => {
  if (typeof type === 'object' && type !== null) {
    return '[complex value]';
  }
  if (typeof type === 'string') {
    return `'${type}'`;
  }
  return type;
};

const choosePath = (path, value) => {
  if (path === '') {
    return value.name;
  }
  return `${path}.${value.name}`;
};

const plain = (value) => {
  const iter = (currentValue, path = '') => {
    const arrValue = Object.values(currentValue);
    const lines = arrValue.flatMap((val) => {
      const currentPath = choosePath(path, val);
      if (val.status === 'added') {
        return `Property '${currentPath}' was added with value: ${getType(val.value)}`;
      } if (val.status === 'changed') {
        return `Property '${currentPath}' was updated. From ${getType(val.value1)} to ${getType(val.value2)}`;
      } if (val.status === 'nested') {
        return iter(val.children, currentPath);
      }
      return (val.status === 'deleted') ? `Property '${currentPath}' was removed` : [];
    });
    const filteredLines = lines.filter((line) => line !== undefined);
    return filteredLines.join('\n');
  };
  return iter(value);
};
export default plain;
