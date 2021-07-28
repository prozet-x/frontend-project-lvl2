import _ from 'lodash';
import parse from './parsers.js';
import getFormattedResult from '../formatters/index.js';

const objToArr = (obj) => {
  const keys = Object.keys(obj);
  const res = keys.reduce((arr, key) => {
    arr.push([' ', key, typeof obj[key] === 'object' ? objToArr(obj[key]) : obj[key]]);
    return arr;
  }, []);
  return res;
};

const getDiff = (filePath1, filePath2) => {
  const getDiffs = (obj1, obj2) => {
    const keys = _.uniq(_.concat(Object.keys(obj1), Object.keys(obj2))).sort();
    const res = keys.reduce((arr, key) => {
      const in1 = _.has(obj1, key);
      const in2 = _.has(obj2, key);
      if (in1 && in2) {
        if ((typeof obj1[key] === 'object') && (obj1[key] !== null) && (typeof obj2[key] !== 'object')) {
          arr.push(['-', key, objToArr(obj1[key])]);
          arr.push(['+', key, obj2[key]]);
        } else if ((typeof obj1[key] !== 'object') && (typeof obj2[key] === 'object') && (obj2[key] !== null)) {
          arr.push(['-', key, obj1[key]]);
          arr.push(['+', key, objToArr(obj2[key])]);
        } else if (((typeof obj1[key] === 'object') && (typeof obj2[key] === 'object'))) {
          arr.push([' ', key, getDiffs(obj1[key], obj2[key])]);
        } else if (obj1[key] === obj2[key]) {
          arr.push([' ', key, obj1[key]]);
        } else {
          arr.push(['-', key, obj1[key]]);
          arr.push(['+', key, obj2[key]]);
        }
      } else if (in1 && !in2) {
        if (typeof obj1[key] === 'object') {
          arr.push(['-', key, objToArr(obj1[key])]);
        } else {
          arr.push(['-', key, obj1[key]]);
        }
      } else if (typeof obj2[key] === 'object') {
        arr.push(['+', key, objToArr(obj2[key])]);
      } else {
        arr.push(['+', key, obj2[key]]);
      }
      return arr;
    }, []);
    return res;
  };

  const data1 = parse(filePath1);
  const data2 = parse(filePath2);
  const result = getDiffs(data1, data2);

  return result;
};

export default (filePath1, filePath2, format) => {
  const dif = getDiff(filePath1, filePath2);
  return getFormattedResult(dif, format);
};
