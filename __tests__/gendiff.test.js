import { describe, it, expect, beforeAll } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { objToString, getDiff } from '../src/helper';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename));

let path1;
let path2;

beforeAll(() => {
	path1 = readFile('file1.json');
	path2 = readFile('file2.json');
});



describe('genDiff', () => {
	it('test 1', () => {
		const firstObject = JSON.parse(path1);       
		const secondObject = JSON.parse(path2);
		const resultObject = getDiff(firstObject, secondObject);
		const str = objToString(resultObject);
		const actual = str;
		const expected = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true 
}`;
		expect(actual).toEqual(expected);
	});
  
});
  