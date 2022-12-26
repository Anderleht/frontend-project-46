#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/genDiff.js';

const program = new Command();

program
	.name('gendiff')
	.description('Compares two configuration files and shows a difference.')
	.version('1.0.0')
	.option('-f, --format <type>', 'output format')
	.arguments('<filepath1>', 'path to first file')
	.arguments('<filepath2>', 'path to second file')
	.action((filepath1, filepath2) => {
		genDiff(filepath1, filepath2);
	})
	.parse();
