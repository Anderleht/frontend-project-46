/* eslint-disable no-unexpected-multiline */
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
describe.each([
  ['plain', 'outputPlain.txt'],
  ['stylish', 'outputStylish.txt'],
  ['json', 'outputJson.txt'],
])('gendiff', (formater, expected) => {
  test.each([
    { firstPath: path1, secondPath: path2, format: 'yaml, yml' },
    { firstPath: path3, secondPath: path4, format: 'yaml, yml' },
  ])(`Test ${formater} with $format`, ({ firstPath, secondPath }) => {
    expect(genDiff(firstPath, secondPath, formater)).toBe(readFile(expected));
  });
});
