#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();

program
	.name('gendiff')
	.description('Compares two configuration files and shows a difference')
	.option('-f, --format <type>', 'output format')
	.version('1.0.0')
	.arguments('<filepath1>', 'path to first file')
	.arguments('<filepath2>', 'path to second file');
  

program.parse();
