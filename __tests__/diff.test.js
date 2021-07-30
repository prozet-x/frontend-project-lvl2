import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/diff';

import flatDiff1 from '../__fixtures__/flatDiff1';
import flatDiff2 from '../__fixtures__/flatDiff2';
import stylishDiff from '../__fixtures__/stylishDiff';
import plainDiff from '../__fixtures__/plainDiff';
import jsonDiff from '../__fixtures__/jsonDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

test('JSONPlainTest1', () => {
  expect(genDiff(getFixturePath('test11.json'), getFixturePath('test12.json'))).toEqual(flatDiff1);
});

test('JSONPlainTest2', () => {
  expect(genDiff(getFixturePath('test21.json'), getFixturePath('test22.json'))).toEqual(flatDiff2);
});

test('YMLPlainTest1', () => {
  expect(genDiff(getFixturePath('test11.yml'), getFixturePath('test12.yaml'))).toEqual(flatDiff1);
});

test('YMLPlainTest2', () => {
  expect(genDiff(getFixturePath('test21.yaml'), getFixturePath('test22.yml'))).toEqual(flatDiff2);
});

test('YMLJSONPlainTest1', () => {
  expect(genDiff(getFixturePath('test11.yml'), getFixturePath('test12.json'))).toEqual(flatDiff1);
});

test('JSONYMLPlainTest2', () => {
  expect(genDiff(getFixturePath('test21.json'), getFixturePath('test22.yaml'))).toEqual(flatDiff2);
});

test('recursionTestStylish', () => {
  expect(genDiff(getFixturePath('test1.json'), getFixturePath('test2.yml'))).toEqual(stylishDiff);
});

test('recursionTestPlain', () => {
  expect(genDiff(getFixturePath('test1.json'), getFixturePath('test2.yml'), 'plain')).toEqual(plainDiff);
});

test('recursionTestJSON', () => {
  expect(genDiff(getFixturePath('test1.json'), getFixturePath('test2.yml'), 'json')).toEqual(jsonDiff);
});
