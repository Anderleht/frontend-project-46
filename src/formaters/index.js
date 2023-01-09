import plain from './plain';
import stylish from './stylish';

const getFormat = (value, format) => {
  if (format === 'stylish') {
    const str = stylish(value);
    return `${str.substring(0, str.length - 3)}}`;
  }
  if (format === 'plain') {
    const str = plain(value);
    return str;
  }
  if (format === 'json') {
    const str = JSON.stringify(value, null, 2);
    return str;
  }
  return 'Error wrong format';
};
export default getFormat;
