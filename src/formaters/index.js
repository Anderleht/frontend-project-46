import plain from './plain.js';
import stylish from './stylish.js';

const format = (data, formater) => {
  if (formater === 'stylish') {
    return stylish(data);
  }
  if (formater === 'plain') {
    return plain(data);
  }
  if (formater === 'json') {
    return JSON.stringify(data, null, 2);
  }
  throw new Error(`Wrong formater: ${formater}`);
};
export default format;
