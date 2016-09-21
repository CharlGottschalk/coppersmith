#! /usr/bin/env node

if (!process.argv[2]) {
	require('./init.js');
} else {
	require('./' + process.argv[2].toLowerCase() + '.js');
}