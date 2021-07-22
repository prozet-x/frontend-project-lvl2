import _ from 'lodash';
import fs from 'fs';

export default (filePath1, filePath2) => {
  const json1 = JSON.parse(fs.readFileSync(filePath1, 'utf8'));
  const json2 = JSON.parse(fs.readFileSync(filePath2, 'utf8'));
  const keys = _.uniq(_.concat(Object.keys(json1), Object.keys(json2))).sort();
  const res = keys.reduce((str, key) => {
    const in1 = _.has(json1, key);
    const in2 = _.has(json2, key);
    let innerStr = str;
    if (in1 && in2) {
      if (json1[key] === json2[key]) {
        innerStr += `  ${key}: ${json1[key]}\n`;
      } else {
        innerStr += `- ${key}: ${json1[key]}\n`;
        innerStr += `+ ${key}: ${json2[key]}\n`;
      }
    } else if (in1 && !in2) {
      innerStr += `- ${key}: ${json1[key]}\n`;
    } else if (!in1 && in2) {
      innerStr += `+ ${key}: ${json2[key]}\n`;
    }
    return innerStr;
  }, '');
  // console.log(res);
  return res;
};
