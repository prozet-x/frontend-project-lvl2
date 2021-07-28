#!/usr/bin/env node
import { Command } from 'commander';
import makeDiff from './src/diff.js';

const makeDiffAndOut = (filepath1, filepath2, options) => {
  const result = (options.format !== 'stylish')
    && (options.format !== 'plain')
    && (options.format !== 'json')
    ? 'Bad formatter name!'
    : makeDiff(filepath1, filepath2, options.format);
  console.log(result);
  return result;
};

const program = new Command();
program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => makeDiffAndOut(filepath1, filepath2, options));

program.parse(process.argv);

export default makeDiffAndOut;
