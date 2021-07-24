import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/diff';

const getFixturePath = (fileName) => path.join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', fileName);

test('JSONPlainTest1', () => {
  const should = '  follow: false\n'
    .concat('  host: hexlet.io\n')
    .concat('- old: true\n')
    .concat('- pres: Dima\n')
    .concat('+ pres: Vova\n')
    .concat('  proxy: 123.234.53.22\n')
    .concat('  timeout: 50\n')
    .concat('+ yuong: true');
  expect(genDiff(getFixturePath('test11.json'), getFixturePath('test12.json'))).toEqual(should);
});

test('JSONPlainTest2', () => {
  const should = '+ follow: false\n'
    .concat('- follow1: false\n')
    .concat('+ host: hexlet.io\n')
    .concat('- host1: hexlet.io\n')
    .concat('- old1: true\n')
    .concat('+ pres: Vova\n')
    .concat('- pres1: Dima\n')
    .concat('+ proxy: 123.234.53.22\n')
    .concat('- proxy1: 123.234.53.22\n')
    .concat('+ timeout: 50\n')
    .concat('- timeout1: 50\n')
    .concat('+ yuong: true');
  expect(genDiff(getFixturePath('test21.json'), getFixturePath('test22.json'))).toEqual(should);
});

test('YMLPlainTest1', () => {
  const should = '{\n'
    .concat('    follow: false\n')
    .concat('    host: hexlet.io\n')
    .concat('  - old: true\n')
    .concat('  - pres: Dima\n')
    .concat('  + pres: Vova\n')
    .concat('    proxy: 123.234.53.22\n')
    .concat('    timeout: 50\n')
    .concat('  + yuong: true\n')
    .concat('}');
  expect(genDiff(getFixturePath('test11.yml'), getFixturePath('test12.yml'))).toEqual(should);
});

test('YMLPlainTest2', () => {
  const should = '{\n'
    .concat('  + follow: false\n')
    .concat('  - follow1: false\n')
    .concat('  + host: hexlet.io\n')
    .concat('  - host1: hexlet.io\n')
    .concat('  - old1: true\n')
    .concat('  + pres: Vova\n')
    .concat('  - pres1: Dima\n')
    .concat('  + proxy: 123.234.53.22\n')
    .concat('  - proxy1: 123.234.53.22\n')
    .concat('  + timeout: 50\n')
    .concat('  - timeout1: 50\n')
    .concat('  + yuong: true\n')
    .concat('}');
  expect(genDiff(getFixturePath('test21.yml'), getFixturePath('test22.yml'))).toEqual(should);
});

test('YAMLPlainTest1', () => {
  const should = '{\n'
    .concat('    follow: false\n')
    .concat('    host: hexlet.io\n')
    .concat('  - old: true\n')
    .concat('  - pres: Dima\n')
    .concat('  + pres: Vova\n')
    .concat('    proxy: 123.234.53.22\n')
    .concat('    timeout: 50\n')
    .concat('  + yuong: true\n')
    .concat('}');
  expect(genDiff(getFixturePath('test11.yaml'), getFixturePath('test12.yaml'))).toEqual(should);
});

test('YAMLPlainTest2', () => {
  const should = '{\n'
    .concat('  + follow: false\n')
    .concat('  - follow1: false\n')
    .concat('  + host: hexlet.io\n')
    .concat('  - host1: hexlet.io\n')
    .concat('  - old1: true\n')
    .concat('  + pres: Vova\n')
    .concat('  - pres1: Dima\n')
    .concat('  + proxy: 123.234.53.22\n')
    .concat('  - proxy1: 123.234.53.22\n')
    .concat('  + timeout: 50\n')
    .concat('  - timeout1: 50\n')
    .concat('  + yuong: true\n')
    .concat('}');
  expect(genDiff(getFixturePath('test21.yaml'), getFixturePath('test22.yaml'))).toEqual(should);
});

test('YMLYAMLPlainTest1', () => {
  const should = '{\n'
    .concat('    follow: false\n')
    .concat('    host: hexlet.io\n')
    .concat('  - old: true\n')
    .concat('  - pres: Dima\n')
    .concat('  + pres: Vova\n')
    .concat('    proxy: 123.234.53.22\n')
    .concat('    timeout: 50\n')
    .concat('  + yuong: true\n')
    .concat('}');
  expect(genDiff(getFixturePath('test11.yml'), getFixturePath('test12.yaml'))).toEqual(should);
});

test('YAMLYMLPlainTest1', () => {
  const should = '{\n'
    .concat('  + follow: false\n')
    .concat('  - follow1: false\n')
    .concat('  + host: hexlet.io\n')
    .concat('  - host1: hexlet.io\n')
    .concat('  - old1: true\n')
    .concat('  + pres: Vova\n')
    .concat('  - pres1: Dima\n')
    .concat('  + proxy: 123.234.53.22\n')
    .concat('  - proxy1: 123.234.53.22\n')
    .concat('  + timeout: 50\n')
    .concat('  - timeout1: 50\n')
    .concat('  + yuong: true\n')
    .concat('}');
  expect(genDiff(getFixturePath('test21.yaml'), getFixturePath('test22.yml'))).toEqual(should);
});