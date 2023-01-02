import plain from './plain.js';
import stylish from './stylish.js';

const getFormat = (value, format) => {
	if (format === 'stylish') {
		const str = stylish(value);
		return str;  
	}
	else if (format === 'plain') {
		const str = plain(value);
		return str;  
	}
};
export default getFormat;