const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount).slice(0, -2);

const stringify = (value, depth = 1) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }
  const arrValue = Object.entries(value);
  const lines = arrValue.map(([key, val]) => `${indent(depth)}  ${key}: ${stringify(val, depth + 1)}`);
  const result = ['{', ...lines, `${indent(depth - 1)}  }`].join('\n');

  return result;
};

const stylish = (value) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return String(currentValue);
    }
    const arrValue = Object.entries(currentValue);
    const lines = arrValue.map(([key, val]) => {
      if (val.status === 'added') {
        return `${indent(depth)}+ ${key}: ${stringify(val.value, depth + 1)}`;
      } if (val.status === 'nested') {
        return `${indent(depth)}  ${key}: ${iter(val.value, depth + 1)}`;
      } if (val.status === 'deleted') {
        return `${indent(depth)}- ${key}: ${stringify(val.value, depth + 1)}`;
      } if (val.status === 'unchanged') {
        return `${indent(depth)}  ${key}: ${stringify(val.value, depth + 1)}`;
      }
      return `${indent(depth)}- ${key}: ${stringify(val.value, depth + 1)}\n${indent(depth)}+ ${key}: ${stringify(val.value2, depth + 1)}`;
    });
    const result = ['{', ...lines, `${indent(depth - 1)}  }`].join('\n');
    return result;
  };
  return iter(value, 1);
};
export default stylish;
