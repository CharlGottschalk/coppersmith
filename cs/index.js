#! /usr/bin/env node

if (!process.argv[2]) {
	console.log('====== Using CopperSmith ======');
	console.log('-----------------------------');
	console.log('    $ copper init');
	console.log('    > Initializes doc-smith');
	console.log('-----------------------------');
	console.log('    $ copper add');
	console.log('    > Add new pages');
	console.log('-----------------------------');
	console.log('    $ copper build');
	console.log('    > Generates static files');
} else {
	require('./' + process.argv[2].toLowerCase() + '.js');
}