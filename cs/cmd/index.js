#! /usr/bin/env node

require('pretty-error').start();

if (!process.argv[2]) {
	require('./init.js');
} else {
	require('./' + process.argv[2].toLowerCase() + '.js');
}