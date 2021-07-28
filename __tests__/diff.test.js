import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/diff';

const getFixturePath = (fileName) => path.join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', fileName);

test('JSONPlainTest1', () => {
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
  expect(genDiff(getFixturePath('test11.json'), getFixturePath('test12.json'))).toEqual(should);
});

test('JSONPlainTest2', () => {
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
  expect(genDiff(getFixturePath('test11.yml'), getFixturePath('test12.yaml'))).toEqual(should);
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
  expect(genDiff(getFixturePath('test21.yaml'), getFixturePath('test22.yml'))).toEqual(should);
});

test('YMLJSONPlainTest1', () => {
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
  expect(genDiff(getFixturePath('test11.yml'), getFixturePath('test12.json'))).toEqual(should);
});

test('JSONYMLPlainTest2', () => {
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
  expect(genDiff(getFixturePath('test21.json'), getFixturePath('test22.yaml'))).toEqual(should);
});

test('recursionTestStylish', () => {
  const should = '{\n'
    .concat('    common: {\n')
    .concat('      + follow: false\n')
    .concat('        setting1: Value 1\n')
    .concat('      - setting2: 200\n')
    .concat('      - setting3: true\n')
    .concat('      + setting3: null\n')
    .concat('      + setting4: blah blah\n')
    .concat('      + setting5: {\n')
    .concat('            key5: value5\n')
    .concat('        }\n')
    .concat('        setting6: {\n')
    .concat('            doge: {\n')
    .concat('              - wow: \n')
    .concat('              + wow: so much\n')
    .concat('            }\n')
    .concat('            key: value\n')
    .concat('          + ops: vops\n')
    .concat('        }\n')
    .concat('    }\n')
    .concat('    group1: {\n')
    .concat('      - baz: bas\n')
    .concat('      + baz: bars\n')
    .concat('        foo: bar\n')
    .concat('      - nest: {\n')
    .concat('            key: value\n')
    .concat('        }\n')
    .concat('      + nest: str\n')
    .concat('    }\n')
    .concat('  - group2: {\n')
    .concat('        abc: 12345\n')
    .concat('        deep: {\n')
    .concat('            id: 45\n')
    .concat('        }\n')
    .concat('    }\n')
    .concat('  + group3: {\n')
    .concat('        deep: {\n')
    .concat('            id: {\n')
    .concat('                number: 45\n')
    .concat('            }\n')
    .concat('        }\n')
    .concat('        fee: 100500\n')
    .concat('    }\n')
    .concat('}');
  expect(genDiff(getFixturePath('test1.json'), getFixturePath('test2.yml'))).toEqual(should);
});

test('recursionTestPlain', () => {
  const should = 'Property \'common.follow\' was added with value: false\n'
    .concat('Property \'common.setting2\' was removed\n')
    .concat('Property \'common.setting3\' was updated. From true to null\n')
    .concat('Property \'common.setting4\' was added with value: \'blah blah\'\n')
    .concat('Property \'common.setting5\' was added with value: [complex value]\n')
    .concat('Property \'common.setting6.doge.wow\' was updated. From \'\' to \'so much\'\n')
    .concat('Property \'common.setting6.ops\' was added with value: \'vops\'\n')
    .concat('Property \'group1.baz\' was updated. From \'bas\' to \'bars\'\n')
    .concat('Property \'group1.nest\' was updated. From [complex value] to \'str\'\n')
    .concat('Property \'group2\' was removed\n')
    .concat('Property \'group3\' was added with value: [complex value]');
  expect(genDiff(getFixturePath('test1.json'), getFixturePath('test2.yml'), 'plain')).toEqual(should);
});
