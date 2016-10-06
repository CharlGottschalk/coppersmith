/* jshint node: true */
'use strict';

var inquirer = require('inquirer'),
	fs = require('fs'),
	path = require('path'),
	slugify = require('slugify'),
	helper = require('./lib/helper.js'),
	cwd = process.cwd(),
	config = require(path.join(cwd, 'coppersmith.json')),
	docsPath = path.join(cwd, config.sourcePath, 'pages'),
	snippets = [],
	collections = [
		'home',
		new inquirer.Separator()
	],
	pages = [
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
		page: {
			type: 'list',
			name: 'page',
			message: 'For what page?',
			choices: pages
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

function loadPages(args) {
	pages = [];
	var dir = path.join(docsPath, args.collection);
	var dirs = fs.readdirSync(dir).filter(function(file) {
		return fs.statSync(path.join(dir, file)).isDirectory();
	});
	var i = dirs.length;
	while(i--) {
		pages.push(dirs[i]);
	}
	questions.page.choices = pages;
	choosePage(args);
}

function askTitle() {
	helper.log.dark('CopperSmith: Snippet');
	helper.log.info('Please answer the following questions:');
	inquirer.prompt(questions.title).then(function(answers) {
		var args = {
			slug: slugify(answers.title),
			collection: 'home',
			page: '',
			paths: {}
		};
		chooseCollection(args);
	});
}

function chooseCollection(args) {
	inquirer.prompt(questions.collection).then(function(answers) {
		args.collection = slugify(answers.collection);
		if (answers.collection === 'home') {
			save(args);
		} else {
			loadPages(args);
		}
	});
}

function choosePage(args) {
	inquirer.prompt(questions.page).then(function(answers) {
		args.page = answers.page;
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
	if (args.collection !== 'home') {
		collectionPath = args.collection;
		snippetPath = path.join(args.page, '_snippets');
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
        snipStub = helper.getStub('snippet.html'),
        exists = false;
    try {
		exists = fs.statSync(paths.snippet);
	} catch(e) {
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
		helper.log.mag('  > ' + snippets[i].title + ' at ' + snippets[i].paths.page);
	}
}

loadCollections();
askTitle();