import { describe, it, expect } from '@jest/globals';
import { genDiff } from '../src/helper';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');


const path1 = getFixturePath('file1.json');
const path2 = getFixturePath('file2.json');
const path3 = getFixturePath('file1.yml');
const path4 = getFixturePath('file2.yml');

describe('genDiff', () => {
	it('test json', () => {
		const actual = genDiff(path1, path2);
		const expected = readFile('tester.txt');
		expect(actual).toEqual(expected);
	});
	it('test yml', () => {
		const actual = genDiff(path3, path4);
		const expected = readFile('tester.txt');
		expect(actual).toEqual(expected);
	});
});
  
  