import _ from 'lodash';

const makeValue = (value) => {
  if (Array.isArray(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

export default (data) => {
  const getResult = (dif, way) => dif.reduce((acc, elem) => {
    const localWay = way === '' ? elem[1] : `${way}.${elem[1]}`;
    const value = makeValue(elem[2]);

    if (elem[0] === '-') {
      return { ...acc, [localWay]: { change: '-', oldValue: value } };
    }

    if (elem[0] === '+') {
      if (_.has(acc, localWay)) {
        return { ...acc, [localWay]: { change: '*', newValue: value, oldValue: acc[localWay].oldValue } };
      }
      return { ...acc, [localWay]: { change: '+', newValue: value } };
    }

    if (Array.isArray(elem[2])) {
      return { ...acc, ...getResult(elem[2], localWay) };
    }

    return acc;
  }, {});

  const preparings = getResult(data, '');

  return Object.keys(preparings).reduce((res, key) => {
    const begin = `Property '${key}' was `;

    if (preparings[key].change === '+') {
      const mainInfo = `added with value: ${preparings[key].newValue}`;
      return res === ''
        ? begin.concat(mainInfo)
        : res.concat('\n', begin.concat(mainInfo));
    }

    if (preparings[key].change === '-') {
      return res === ''
        ? begin.concat('removed')
        : res.concat('\n', begin.concat('removed'));
    }

    const mainInfo = `updated. From ${preparings[key].oldValue} to ${preparings[key].newValue}`;
    return res === ''
      ? begin.concat(mainInfo)
      : res.concat('\n', begin.concat(mainInfo));
  }, '');
};
