import { describe, expect, test } from '@jest/globals';
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);

const getFixturePath = (filename) => path.join(dirName, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const path1 = getFixturePath('file1.json');
const path2 = getFixturePath('file2.json');
const path3 = getFixturePath('file1.yml');
const path4 = getFixturePath('file2.yaml');
describe('genDiff yml test', () => {
  test.each([
    [genDiff(path3, path4), readFile('outputStylish.txt')],
    [genDiff(path3, path4, 'plain'), readFile('outputPlain.txt')],
  ])('Yml with stylish, and plain', (actual, expected) => {
    expect(actual).toBe(expected);
  });
});
describe('genDiff json test', () => {
  test.each([
    [genDiff(path1, path2), readFile('outputStylish.txt')],
    [genDiff(path1, path2, 'plain'), readFile('outputPlain.txt')],
    [genDiff(path1, path2, 'json'), readFile('outputJson.txt')],
  ])('json with stylish, plain, json', (actual, expected) => {
    expect(actual).toBe(expected);
  });
});
