import _ from 'lodash';
import path from 'path';
import parse from './parsers.js';

export default (filePath1, filePath2) => {
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
  if ((path.extname(filePath1) === '.yml') || (path.extname(filePath2) === '.yml') || (path.extname(filePath1) === '.yaml') || (path.extname(filePath2) === '.yaml')) {
    res = '{\n'
      .concat(res.split('\n').map((str) => '  '.concat(str)).join('\n'))
      .concat('\n}');
  }
  console.log(res);
  return res;
};

/* export const YMLDiff = (filePath1, filePath2) => {
  const yml1 = yaml.load(fs.readFileSync(filePath1, 'utf8'));
  const yml2 = yaml.load(fs.readFileSync(filePath2, 'utf8'));
  console.log(yml1['old']);
  console.log(yml2);
}; */
