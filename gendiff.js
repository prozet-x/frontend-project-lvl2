#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from './src/diff.js';

const program = new Command();
program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => genDiff(filepath1, filepath2));

program.parse(process.argv);

/* It is for 2 step
const options = program.opts();
if (options.format === undefined) console.log('no format');
else if (options.format === true) console.log('add format');
else console.log(`add format type ${options.format}`); */
// if (!program.args.length) program.help();
