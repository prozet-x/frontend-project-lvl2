import plainFormatter from './plain.js';
import stylishFormatter from './stylish.js';
import jsonFormatter from './json.js';

export default (dif, format = 'stylish') => {
  if (format === 'stylish') {
    return stylishFormatter(dif);
  }
  if (format === 'json') {
    return jsonFormatter(dif);
  }
  return plainFormatter(dif);
};
