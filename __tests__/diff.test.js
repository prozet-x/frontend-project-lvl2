import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/diff';

const getFixturePath = (fileName) => path.join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', fileName);

test('JSONPlainTest1', () => {
  const should = [
    [' ', 'follow', false],
    [' ', 'host', 'hexlet.io'],
    ['-', 'old', true],
    ['-', 'pres', 'Dima'],
    ['+', 'pres', 'Vova'],
    [' ', 'proxy', '123.234.53.22'],
    [' ', 'timeout', 50],
    ['+', 'yuong', true],
  ];
  expect(genDiff(getFixturePath('test11.json'), getFixturePath('test12.json'))).toEqual(should);
});

test('JSONPlainTest2', () => {
  const should = [
    ['+', 'follow', false],
    ['-', 'follow1', false],
    ['+', 'host', 'hexlet.io'],
    ['-', 'host1', 'hexlet.io'],
    ['-', 'old1', true],
    ['+', 'pres', 'Vova'],
    ['-', 'pres1', 'Dima'],
    ['+', 'proxy', '123.234.53.22'],
    ['-', 'proxy1', '123.234.53.22'],
    ['+', 'timeout', 50],
    ['-', 'timeout1', 50],
    ['+', 'yuong', true],
  ];
  expect(genDiff(getFixturePath('test21.json'), getFixturePath('test22.json'))).toEqual(should);
});

test('YMLPlainTest1', () => {
  const should = [
    [' ', 'follow', false],
    [' ', 'host', 'hexlet.io'],
    ['-', 'old', true],
    ['-', 'pres', 'Dima'],
    ['+', 'pres', 'Vova'],
    [' ', 'proxy', '123.234.53.22'],
    [' ', 'timeout', 50],
    ['+', 'yuong', true],
  ];
  expect(genDiff(getFixturePath('test11.yml'), getFixturePath('test12.yaml'))).toEqual(should);
});

test('YMLPlainTest2', () => {
  const should = [
    ['+', 'follow', false],
    ['-', 'follow1', false],
    ['+', 'host', 'hexlet.io'],
    ['-', 'host1', 'hexlet.io'],
    ['-', 'old1', true],
    ['+', 'pres', 'Vova'],
    ['-', 'pres1', 'Dima'],
    ['+', 'proxy', '123.234.53.22'],
    ['-', 'proxy1', '123.234.53.22'],
    ['+', 'timeout', 50],
    ['-', 'timeout1', 50],
    ['+', 'yuong', true],
  ];
  expect(genDiff(getFixturePath('test21.yaml'), getFixturePath('test22.yml'))).toEqual(should);
});

test('YMLJSONPlainTest1', () => {
  const should = [
    [' ', 'follow', false],
    [' ', 'host', 'hexlet.io'],
    ['-', 'old', true],
    ['-', 'pres', 'Dima'],
    ['+', 'pres', 'Vova'],
    [' ', 'proxy', '123.234.53.22'],
    [' ', 'timeout', 50],
    ['+', 'yuong', true],
  ];
  expect(genDiff(getFixturePath('test11.yml'), getFixturePath('test12.json'))).toEqual(should);
});

test('JSONYMLPlainTest2', () => {
  const should = [
    ['+', 'follow', false],
    ['-', 'follow1', false],
    ['+', 'host', 'hexlet.io'],
    ['-', 'host1', 'hexlet.io'],
    ['-', 'old1', true],
    ['+', 'pres', 'Vova'],
    ['-', 'pres1', 'Dima'],
    ['+', 'proxy', '123.234.53.22'],
    ['-', 'proxy1', '123.234.53.22'],
    ['+', 'timeout', 50],
    ['-', 'timeout1', 50],
    ['+', 'yuong', true],
  ];
  expect(genDiff(getFixturePath('test21.json'), getFixturePath('test22.yaml'))).toEqual(should);
});

test('recursionTest', () => {
  const should = [
    [' ', 'common', [
      ['+', 'follow', false],
      [' ', 'setting1', 'Value 1'],
      ['-', 'setting2', 200],
      ['-', 'setting3', true],
      ['+', 'setting3', null],
      ['+', 'setting4', 'blah blah'],
      ['+', 'setting5', [
        [' ', 'key5', 'value5'],
      ]],
      [' ', 'setting6', [
        [' ', 'doge', [
          ['-', 'wow', ''],
          ['+', 'wow', 'so much'],
        ]],
        [' ', 'key', 'value'],
        ['+', 'ops', 'vops'],
      ]],
    ]],
    [' ', 'group1', [
      ['-', 'baz', 'bas'],
      ['+', 'baz', 'bars'],
      [' ', 'foo', 'bar'],
      ['-', 'nest', [
        [' ', 'key', 'value'],
      ]],
      ['+', 'nest', 'str'],
    ]],
    ['-', 'group2', [
      [' ', 'abc', 12345],
      [' ', 'deep', [
        [' ', 'id', 45],
      ]],
    ]],
    ['+', 'group3', [
      [' ', 'deep', [
        [' ', 'id', [
          [' ', 'number', 45],
        ]],
      ]],
      [' ', 'fee', 100500],
    ]],
  ];
  expect(genDiff(getFixturePath('test1.json'), getFixturePath('test2.yml'))).toEqual(should);
});
