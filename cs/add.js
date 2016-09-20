'use strict';

var inquirer = require('inquirer'),
	fs = require('fs'),
	path = require('path'),
	slugify = require('slugify'),
	helper = require('./helper.js'),
	cwd = process.cwd(),
	config = require(path.join(cwd, 'doc-smith.json')),
	docsPath = path.join(cwd, config.sourcePath, 'pages'),
	pages= [],
	collections = [
		'new',
		'root',
		new inquirer.Separator()
	],
	parents = [
		'none',
		'new',
		new inquirer.Separator()
	],
	questions = {
		title: {
			type: 'input',
			name: 'title',
			message: 'What would you like to call the page?'
		},
		collection: {
			type: 'list',
			name: 'collection',
			message: 'What collection does it belong to?',
			choices: collections
		},
		newCollection: {
			type: 'input',
			name: 'newCollection',
			message: 'What would you like to call the new collection?'
		},
		snippetA: {
			type: 'confirm',
			name: 'snippetA',
			message: 'Would you like to add a snippet file?',
			default: true
		},
		snippetB: {
			type: 'confirm',
			name: 'snippetB',
			message: 'Would you like to add another snippet file?',
			default: true
		},
		snippet: {
			type: 'input',
			name: 'name',
			message: 'What would you like to call the snippet?'
		},
		more: {
			type: 'confirm',
			name: 'more',
			message: 'Would you like to add another page?',
			default: false
		},
	};

function loadCollections() {
	var dirs = fs.readdirSync(docsPath).filter(function(file) {
		return fs.statSync(path.join(docsPath, file)).isDirectory();
	});
	for (var i = dirs.length - 1; i >= 0; i--) {
		collections.push(dirs[i]);
		parents.push(dirs[i]);
	}
}

function askTitle() {
	inquirer.prompt(questions.title).then(function(answers) {
		var args = {
			title: helper.titleCase(answers.title),
			slug: slugify(answers.title),
			collection: 'root',
			collectionExists: true,
			snippets: [],
			route: '',
			version: '0.1.0',
			author: '',
			paths: {}
		};
		chooseCollection(args);
	});
}

function chooseCollection(args) {
	inquirer.prompt(questions.collection).then(function(answers) {
		if (answers.collection === 'new') {
			askCollection(args);
		} else {
			args.collection = slugify(answers.collection);
			args.collectionExists = true;
			askSnippetA(getRoute(args));
		}
	});
}

function askCollection(args) {
	inquirer.prompt(questions.newCollection).then(function(answers) {
		args.collection = slugify(answers.newCollection);
		args.collectionExists = false;
		askSnippetA(args);
	});
}

function askSnippetA(args) {
	inquirer.prompt(questions.snippetA).then(function(answers) {
		if (answers.snippetA){
			askSnippetName(args);
		} else {
			save(args);
		}
	});
}

function askSnippetB(args) {
	inquirer.prompt(questions.snippetB).then(function(answers) {
		if (answers.snippetB){
			askSnippetName(args);
		} else {
			save(args);
		}
	});
}

function askSnippetName(args) {
	inquirer.prompt(questions.snippet).then(function(answers) {
		args.snippets.push(slugify(answers.name));
		askSnippetB(args);
	});
}

function askAnother(args) {
	inquirer.prompt(questions.more).then(function(answers) {
		if (answers.more){
			askTitle();
		} else {
			complete();
		}
	});
}

function getPaths(args) {
	var collectionPath = '';
	if (args.collection !== 'root') {
		collectionPath = args.collection;
	}
	var paths = {
		root: docsPath,
		collection: path.join(docsPath, collectionPath),
		page: path.join(docsPath, collectionPath, args.slug),
		snips: path.join(docsPath, collectionPath, args.slug, '_snippets')
	};
	return paths;
}

function save(args) {
	pages.push(args);
	var paths = getPaths(args),
		file = path.join(paths.page, args.slug + '.md'),
		snippets = path.join(paths.page, args.slug + '.json'),
        stub = helper.getStub('doc.md'),
        content = helper.format(stub, args);
    if (!args.collectionExists) {
        fs.mkdirSync(paths.collection);
    }
    fs.mkdirSync(paths.page);
    fs.writeFile(file, content, function(err) {
        if (err) {
            return console.log(err);
        }
    });    
    if (args.snippets.length) {
    	var i = args.snippets.length;
    	var snip = '';
    	fs.mkdirSync(paths.snips);
        while (i--) {
        	snip = path.join(paths.snips, args.snippets[i] + '.html');
            fs.writeFile(snip, '<!-- Add code snippet here -->', function(err) {
	            if (err) {
	                return console.log(err);
	            }
	        });
        }
    }
    console.log(args.title + ' created!');
    askAnother();
}

function complete() {
	var i = pages.length;
	console.log('The following pages were created:');
	while(i--) {
		console.log(pages[i].title + ' at ' + pages[i].paths.page);
	}
}

loadCollections();
askTitle();