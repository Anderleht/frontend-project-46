const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (value, depth = 1) => {
	if (typeof value!== 'object' || value === null) {
		return String(value);
	}
	const arrValue = Object.entries(value);
	const lines = arrValue.map(([key, val]) => `${indent(depth)}  ${key}: ${stringify(val, depth + 1)}`);
	const result = ['{', ...lines, `${indent(depth, 3)}}`].join('\n');
  
	return result;
};

const stylish = (value) => {
	const iter = (currentValue, depth) => {
		if (typeof currentValue !== 'object' || currentValue === null) {
			return String(currentValue);
		}
		const arrValue = Object.entries(currentValue);
		const lines = arrValue.map(([key, val]) => {
			let line;
			if (val.status === 'added') {
				line = `${indent(depth)}+ ${key}: ${stringify(val.value, depth + 1)}`;
			}
			else if (val.status === 'nested') {
				line = `${indent(depth)}  ${key}: ${iter(val.value, depth + 1)}`;
			}
			else if (val.status === 'deleted') {
				line = `${indent(depth)}- ${key}: ${stringify(val.value, depth + 1)}`;
			}
			else if (val.status === 'unchanged') {
				line = `${indent(depth)}  ${key}: ${stringify(val.value, depth + 1)}`;
			}
			else if (val.status === 'changed') {
				line = `${indent(depth)}- ${key}: ${stringify(val.value, depth + 1)}\n${indent(depth)}+ ${key}: ${stringify(val.value2, depth + 1)}`; 
			}
			return line;
		});
		const result = ['{', ...lines, `${indent(depth, 3)}}`].join('\n');
		return result;
	};
	return iter(value, 1);
};
export default stylish;