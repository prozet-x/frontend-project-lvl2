#!/usr/bin/env node
import { Command } from 'commander';
import makeDiff from './src/diff.js';

const program = new Command();
program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    const result = (options.format !== 'stylish') && (options.format !== 'plain')
      ? 'Bad formatter name!'
      : makeDiff(filepath1, filepath2, options.format);
    /* if ((options.format !== 'stylish') && (options.format !== 'plain')) {
      return 'Bad formatter name!';
    }
    const result = makeDiff(filepath1, filepath2, options.format); */
    console.log(result);
    return result;
  });

program.parse(process.argv);

/* It is for 2 step
const options = program.opts();
if (options.format === undefined) console.log('no format');
else if (options.format === true) console.log('add format');
else console.log(`add format type ${options.format}`); */
// if (!program.args.length) program.help();
