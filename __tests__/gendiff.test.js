import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/helper';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename));


const path1 = readFile('file1.json');
const path2 = readFile('file2.json');

describe('genDiff', () => {
	it('test 1', () => {
		const actual = genDiff(path1, path2);
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
  