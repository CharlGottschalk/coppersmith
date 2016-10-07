/* jshint node: true */
'use strict';

var inquirer = require('inquirer'),
	fs = require('fs'),
	path = require('path'),
	slugify = require('slugify'),
	helper = require('../lib/helper.js'),
	cwd = process.cwd(),
	config = require(path.join(cwd, 'coppersmith.json')),
	docsPath = path.join(cwd, config.sourcePath, 'pages'),
	author = config.author,
	date = helper.getDate(),
	pages= [],
	collections = [
		'new'
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
		author: {
			type: 'input',
			name: 'author',
			message: 'Who is the author?',
			default: author
		},
		draft: {
			type: 'confirm',
			name: 'draft',
			message: 'Set this page as a draft?',
			default: true
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
		another: {
			type: 'confirm',
			name: 'another',
			message: 'Would you like to add another page?',
			default: false
		},
	};

function loadCollections() {
	var dirs = fs.readdirSync(docsPath).filter(function(file) {
		return fs.statSync(path.join(docsPath, file)).isDirectory() && !file.startsWith('_');
	});
	var i = dirs.length;
	if (i === 0) {
		collections.push('root');
	}
	collections.push(new inquirer.Separator());
	while(i--) {
		collections.push(dirs[i]);
	}
}

function askTitle() {
	helper.log.dark('CopperSmith: Page');
	helper.log.info('Please answer the following questions:');
	inquirer.prompt(questions.title).then(function(answers) {
		var args = {
			title: helper.titleCase(answers.title),
			author: author,
			date: date,
			draft: true,
			slug: slugify(answers.title),
			collection: 'root',
			collectionExists: false,
			snippets: [],
			route: '',
			version: '0.1.0',
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
			args.collectionExists = false;
			askDraft(args);
		}
	});
}

function askCollection(args) {
	inquirer.prompt(questions.newCollection).then(function(answers) {
		args.collection = slugify(answers.newCollection);
		args.collectionExists = false;
		askDraft(args);
	});
}

function askDraft(args) {
	inquirer.prompt(questions.draft).then(function(answers) {
		args.draft = answers.draft;
		askAuthor(args);
	});
}

function askAuthor(args) {
	inquirer.prompt(questions.author).then(function(answers) {
		args.author = helper.titleCase(answers.author);
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
	var collectionPath = '';
	if (args.collection !== 'home') {
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
	var paths = getPaths(args),
		file = path.join(paths.page, args.slug + '.md'),
        docStub = helper.getStub('doc.md'),
        content = helper.format(docStub, args),
        exists = false;
    args.paths = paths;
    pages.push(args);
    try {
		exists = fs.statSync(paths.collection);
	} catch(e) {
		fs.mkdirSync(paths.collection);
	}
    fs.mkdirSync(paths.page);
    fs.writeFile(file, content, function(err) {
        if (err) {
            throw err;
        }
    });
    if (args.snippets.length) {
    	var i = args.snippets.length,
    		snipStub = helper.getStub('snippet.html'),
    		snip = '';
    	fs.mkdirSync(paths.snips);
        while (i--) {
        	snip = path.join(paths.snips, args.snippets[i] + '.html');
            fs.writeFile(snip, snipStub);
        }
    }
    helper.log.dark(args.title + ' created!');
    askAnother();
}

function complete() {
	var i = pages.length;
	helper.log.success('CopperSmith: Complete!');
	helper.log.info('The following pages were created:');
	while(i--) {
		helper.log.mag('  > ' + pages[i].title + ' at ' + pages[i].paths.page);
	}
}

loadCollections();
askTitle();