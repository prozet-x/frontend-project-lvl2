import plain from './plain.js';
import stylish from './stylish.js';

export default (dif, format = 'stylish') => {
  if (format === 'stylish') {
    return stylish(dif);
  }
  return plain(dif);
};
