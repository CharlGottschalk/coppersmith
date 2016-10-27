#! /usr/bin/env node

var helper = require('../lib/helper.js');
require('pretty-error').start();

var commands = {
	'-v': 'version',
	'--version': 'version',
	'-h': 'help',
	'--help': 'help',
	'init': 'init',
	'page': 'page',
	'snip': 'snip',
	'theme': 'theme',
	'build': 'build',
	'publish': 'publish'
}

if (!process.argv[2]) {
	require('./help.js');
} else {
	var command = commands[process.argv[2].toLowerCase()];
	if (command !== undefined) {
		require('./' + command + '.js');
	} else {
		helper.log.error('CopperSmith does not have a [' + process.argv[2].toLowerCase() + '] command.');
	}
}