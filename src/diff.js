// import { access } from 'fs';
import _ from 'lodash';
// import path from 'path';
import parse from './parsers.js';

/* export default (filePath1, filePath2) => {
  const data1 = parse(filePath1);
  const data2 = parse(filePath2);
  const keys = _.uniq(_.concat(Object.keys(data1), Object.keys(data2))).sort();
  let res = keys.reduce((str, key) => {
    const in1 = _.has(data1, key);
    const in2 = _.has(data2, key);
    let innerStr = str;
    if (in1 && in2) {
      if (data1[key] === data2[key]) {
        innerStr += `  ${key}: ${data1[key]}\n`;
      } else {
        innerStr += `- ${key}: ${data1[key]}\n`;
        innerStr += `+ ${key}: ${data2[key]}\n`;
      }
    } else if (in1 && !in2) {
      innerStr += `- ${key}: ${data1[key]}\n`;
    } else if (!in1 && in2) {
      innerStr += `+ ${key}: ${data2[key]}\n`;
    }
    return innerStr;
  }, '');
  res = res.trimEnd();
  // res = _.trim(res);
  if ((path.extname(filePath1) === '.yml')
  || (path.extname(filePath2) === '.yml')
  || (path.extname(filePath1) === '.yaml') || (path.extname(filePath2) === '.yaml')) {
    res = '{\n'
      .concat(res.split('\n').map((str) => '  '.concat(str)).join('\n'))
      .concat('\n}');
  }
  // console.log(res);
  return res;
}; */

const objToArr = (obj) => {
  const keys = Object.keys(obj);
  const res = keys.reduce((arr, key) => {
    arr.push([' ', key, typeof obj[key] === 'object' ? objToArr(obj[key]) : obj[key]]);
    return arr;
  }, []);
  return res;
};

export default (filePath1, filePath2) => {
  const getDiffs = (obj1, obj2) => {
    const keys = _.uniq(_.concat(Object.keys(obj1), Object.keys(obj2))).sort();
    const res = keys.reduce((arr, key) => {
      const in1 = _.has(obj1, key);
      const in2 = _.has(obj2, key);
      if (in1 && in2) {
        if ((typeof obj1[key] === 'object') && (obj1[key] !== null) && (typeof obj2[key] !== 'object')) {
          arr.push(['-', key, objToArr(obj1[key])]);
          arr.push(['+', key, obj2[key]]);
        } else if ((typeof obj1[key] !== 'object') && (typeof obj2[key] === 'object') && (obj2[key !== null])) {
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

  /* const keys = _.uniq(_.concat(Object.keys(data1), Object.keys(data2))).sort();
  let res = keys.reduce((str, key) => {
    const in1 = _.has(data1, key);
    const in2 = _.has(data2, key);
    let innerStr = str;
    if (in1 && in2) {
      if (data1[key] === data2[key]) {
        innerStr += `  ${key}: ${data1[key]}\n`;
      } else {
        innerStr += `- ${key}: ${data1[key]}\n`;
        innerStr += `+ ${key}: ${data2[key]}\n`;
      }
    } else if (in1 && !in2) {
      innerStr += `- ${key}: ${data1[key]}\n`;
    } else if (!in1 && in2) {
      innerStr += `+ ${key}: ${data2[key]}\n`;
    }
    return innerStr;
  }, '');
  res = res.trimEnd();
  if ((path.extname(filePath1) === '.yml')
  || (path.extname(filePath2) === '.yml')
  || (path.extname(filePath1) === '.yaml') || (path.extname(filePath2) === '.yaml')) {
    res = '{\n'
      .concat(res.split('\n').map((str) => '  '.concat(str)).join('\n'))
      .concat('\n}');
  }
  // console.log(res); */
  return result;
};

/* export const YMLDiff = (filePath1, filePath2) => {
  const yml1 = yaml.load(fs.readFileSync(filePath1, 'utf8'));
  const yml2 = yaml.load(fs.readFileSync(filePath2, 'utf8'));
  console.log(yml1['old']);
  console.log(yml2);
}; */
