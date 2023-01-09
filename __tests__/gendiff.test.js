import { describe, it, expect } from '@jest/globals';
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

const getFixturePath = (filename) => path.join(dirName, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const path1 = getFixturePath('file1.json');
const path2 = getFixturePath('file2.json');
const path3 = getFixturePath('file1.yml');
const path4 = getFixturePath('file2.yml');

describe('genDiff', () => {
  it('test stylish json', () => {
    const actual = genDiff(path1, path2);
    const expected = readFile('tester.txt');
    expect(actual).toEqual(expected);
  });
  it('test stylish yml', () => {
    const actual = genDiff(path3, path4);
    const expected = readFile('tester.txt');
    expect(actual).toEqual(expected);
  });
  it('test plain json', () => {
    const actual = genDiff(path1, path2, 'plain');
    const expected = readFile('tester2.txt');
    expect(actual).toEqual(expected);
  });
  it('test plain yml', () => {
    const actual = genDiff(path3, path4, 'plain');
    const expected = readFile('tester2.txt');
    expect(actual).toEqual(expected);
  });
  it('test json', () => {
    const actual = genDiff(path1, path2, 'json');
    const expected = readFile('tester3.txt');
    expect(actual).toEqual(expected);
  });
});
