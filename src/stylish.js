

const stylish = (value) => {
	const replacer = ' ';
	const spacesCount = 2;
	const iter = (currentValue, depth) => {
		if (typeof currentValue !== 'object' || currentValue === null) {
			return String(currentValue);
		}
		const indentSize = spacesCount * depth;
		const currentIndent = replacer.repeat(indentSize);
		const bracketIndent = replacer.repeat(indentSize - spacesCount);
  
		const arrValue = Object.entries(currentValue);
		const lines = arrValue.map(([key, val]) => {
			if (val.status === 'added') {
				return `${currentIndent}  + ${key}: ${iter(val.value, depth + 1)}`;
			}
			else if (val.status === 'nested') {
				return `${currentIndent}  ${key}: ${iter(val.value, depth + 1)}`;
			}
			else if (val.status === 'deleted') {
				return `${currentIndent}  - ${key}: ${iter(val.value, depth + 1)}`;
			}
			else if (val.status === 'unchanged') {
				return `${currentIndent}    ${key}: ${iter(val.value, depth + 1)}`;
			}
			else if (val.status === 'changed') {
				return `${currentIndent}  - ${key}: ${iter(val.value, depth + 1)}\n${currentIndent}  + ${key}: ${iter(val.value2, depth + 1)}`; 
			}
			else {
				return `${currentIndent}    ${key}: ${iter(val, depth + 1)}`;
			}
		});
		const result = ['{', ...lines, `${bracketIndent}}`].join('\n');
  
		return result;
	};
	return iter(value, 1);
};
export default stylish;