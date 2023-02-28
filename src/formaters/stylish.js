import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount).slice(0, -2);

const stringify = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const arrValue = Object.entries(value);
  const lines = arrValue.map(([key, val]) => `${indent(depth)}  ${key}: ${stringify(val, depth + 1)}`);
  const result = ['{', ...lines, `${indent(depth - 1)}  }`].join('\n');

  return result;
};

const stylish = (value) => {
  const iter = (currentValue, depth) => {
    const lastBracketIndent = depth === 1 ? '' : `${indent(depth - 1)}  `;
    const arrValue = Object.values(currentValue);
    const lines = arrValue.map((val) => {
      switch (val.status) {
        case 'changed':
          return `${indent(depth)}- ${val.name}: ${stringify(val.value1, depth + 1)}\n${indent(depth)}+ ${val.name}: ${stringify(val.value2, depth + 1)}`;
        case 'unchanged':
          return `${indent(depth)}  ${val.name}: ${stringify(val.value, depth + 1)}`;
        case 'deleted':
          return `${indent(depth)}- ${val.name}: ${stringify(val.value, depth + 1)}`;
        case 'nested':
          return `${indent(depth)}  ${val.name}: ${iter(val.children, depth + 1)}`;
        case 'added':
          return `${indent(depth)}+ ${val.name}: ${stringify(val.value, depth + 1)}`;
        default:
          throw new Error(`Unknown type ${val.stat}`);
      }
    });
    const result = ['{', ...lines, `${lastBracketIndent}}`].join('\n');
    return result;
  };
  return iter(value, 1);
};
export default stylish;
