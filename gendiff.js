#!/usr/bin/env node

import _ from 'lodash';
import { Command } from 'commander';
const program = new Command();

import * as fs from 'fs';

program 
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    return genDiff(filepath1, filepath2);
  });

export const genDiff = (filePath1, filePath2) => {
  const json1 = JSON.parse(fs.readFileSync(filePath1, "utf8"));
  const json2 = JSON.parse(fs.readFileSync(filePath2, "utf8"));
  const keys = _.uniq(_.concat(Object.keys(json1), Object.keys(json2))).sort();
  const res = keys.reduce((str, key) => {
    const in1 = _.has(json1, key);
    const in2 = _.has(json2, key);
    if (in1 && in2) {
      if (json1[key] === json2[key]) {
        str += `  ${key}: ${json1[key]}\n`;
      } else {
        str += `- ${key}: ${json1[key]}\n`;
        str += `+ ${key}: ${json1[key]}\n`;
      }
    } else if (in1 && !in2) {
      str += `- ${key}: ${json1[key]}\n`;
    } else if (!in1 && in2) {
      str += `+ ${key}: ${json2[key]}\n`;
    }
    return str;
  }, '');
  console.log(res);
  return res;
};

program.parse(process.argv);
/* It is for 2 step
const options = program.opts();
if (options.format === undefined) console.log('no format');
else if (options.format === true) console.log('add format');
else console.log(`add format type ${options.format}`);*/
//if (!program.args.length) program.help();