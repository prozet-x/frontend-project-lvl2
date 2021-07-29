import _ from 'lodash';

const makeValue = (value) => {
  if (Array.isArray(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

export default (data) => {
  const getResult = (dif, way, res) => {
    dif.forEach((elem) => {
      const localWay = way === '' ? elem[1] : `${way}.${elem[1]}`;
      const value = makeValue(elem[2]);
      /* if (Array.isArray(elem[2])) {
        value = '[complex value]';
      } else if (typeof elem[2] === 'string') {
        value = `'${elem[2]}'`;
      } else {
        [,, value] = elem;
      } */
      if (elem[0] === '-') {
        res[localWay] = {
          change: '-',
          oldValue: value,
        };
      } else if (elem[0] === '+') {
        if (_.has(res, localWay)) {
          res[localWay].change = '*';
          res[localWay].newValue = value;
        } else {
          res[localWay] = {
            change: '+',
            newValue: value,
          };
        }
      } else if (Array.isArray(elem[2])) {
        getResult(elem[2], localWay, res);
      }
    });
    return res;
  };

  const preparings = getResult(data, '', {});

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

    /* let newStr = `Property '${key}' was `;
    if (preparings[key].change === '+') {
      newStr = newStr.concat(`added with value: ${preparings[key].newValue}`);
    } else if (preparings[key].change === '-') {
      newStr = newStr.concat('removed');
    } else {
      newStr = newStr
        .concat(`updated. From ${preparings[key].oldValue} to ${preparings[key].newValue}`);
    }
    return res === '' ? newStr : res.concat('\n', newStr); */
  }, '');
};
