/* jshint node: true */
'use strict';

var inquirer = require('inquirer'),
	fs = require('fs'),
	path = require('path'),
	helper = require('../lib/helper.js'),
	cwd = process.cwd(),
	config = require(path.join(cwd, 'coppersmith.json')),
	docsPath = path.join(cwd, config.sourcePath, 'pages'),
	snippets = [],
	collections = [
		'global',
		new inquirer.Separator()
	],
	snippets = [
	],
	questions = {
		title: {
			type: 'input',
			name: 'title',
			message: 'What would you like to call the snippet?'
		},
		collection: {
			type: 'list',
			name: 'collection',
			message: 'In which collection?',
			choices: collections
		},
		another: {
			type: 'confirm',
			name: 'another',
			message: 'Would you like to add another snippet?',
			default: false
		},
	};

function loadCollections() {
	var dirs = fs.readdirSync(docsPath).filter(function(file) {
		return fs.statSync(path.join(docsPath, file)).isDirectory() && !file.startsWith('_');
	});
	var i = dirs.length;
	while(i--) {
		collections.push(dirs[i]);
	}
}

function askTitle() {
	helper.log.dark('CopperSmith: Snippet');
	helper.log.info('Please answer the following questions:');
	inquirer.prompt(questions.title).then(function(answers) {
		var args = {
			slug: helper.slugify(answers.title),
			collection: 'global',
			page: '',
			paths: {}
		};
		chooseCollection(args);
	});
}

function chooseCollection(args) {
	inquirer.prompt(questions.collection).then(function(answers) {
		args.collection = helper.slugify(answers.collection);
		save(args);
	});
}

function askAnother() {
	inquirer.prompt(questions.another).then(function(answers) {
		if (answers.another){
			askTitle();
		} else {
			complete();
		}
	});
}

function getPaths(args) {
	var collectionPath = '',
		snippetPath = '_snippets';
	if (args.collection !== 'global') {
		collectionPath = args.collection;
	}
	var paths = {
		root: docsPath,
		collection: path.join(docsPath, collectionPath),
		snippet: path.join(docsPath, collectionPath, snippetPath)
	};
	
	return paths;
}

function save(args) {
	var paths = getPaths(args),
		file = path.join(paths.snippet, args.slug + '.html'),
        snipStub = helper.getStub('snippet.html');

    if (!fs.existsSync(paths.snippet)) {
    	fs.mkdirSync(paths.snippet);
    }

    fs.writeFile(file, snipStub, function(err) {
        if (err) {
            throw err;
        }
    });

    args.paths = paths;
    snippets.push(args);
    helper.log.dark(args.slug + ' created!');
    askAnother();
}

function complete() {
	var i = snippets.length;
	helper.log.success('CopperSmith: Complete!');
	helper.log.info('The following snippets were created:');
	while(i--) {
		helper.log.mag('  > ' + snippets[i].title + ' at ' + snippets[i].paths.collection);
	}
}

loadCollections();
askTitle();