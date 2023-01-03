const getType = (type) => {
	if (typeof type === 'object' && type !== null) {
		return '[complex value]';
	} 
	else if (typeof type === 'string') {
		return `'${type}'`;
	} else {
		return type;
	}
};
const plain = (value) => {
	const iter = (currentValue, path = '') => {
		let currentPath;
		const arrValue = Object.entries(currentValue);
		const lines = arrValue.flatMap(([key, val]) => {
			let line;
			if (path === '') {
				currentPath = key;
			} else {
				currentPath = path + `.${key}`;
			}
			if (val.status === 'added') {
				line = `Property '${currentPath}' was added with value: ${getType(val.value)}`;
			}
			else if (val.status === 'nested') {
				return iter(val.value, currentPath);
			}
			else if (val.status === 'deleted') {
				line = `Property '${currentPath}' was removed`;
			}
			else if (val.status === 'changed') {
				line = `Property '${currentPath}' was updated. From ${getType(val.value)} to ${getType(val.value2)}`; 
			}
			return line;
		});
		const filteredLines = lines.filter((line) => line !== undefined);
		return filteredLines.join('\n');
	};
	return iter(value);
};
export default plain;