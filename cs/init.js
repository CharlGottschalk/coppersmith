'use strict';

var inquirer = require('inquirer'),
	fs = require('fs'),
	path = require('path'),
	slugify = require('slugify'),
	helper = require('./helper.js'),
	cwd = process.cwd();

var questions = {
		source: {
			type: 'input',
			name: 'source',
			message: 'Where would you like to store your source files?',
			default: 'src'
		},
		build: {
			type: 'input',
			name: 'build',
			message: 'Where would you like your docs to be built?',
			default: 'build'
		},
	};

function askSource() {
	inquirer.prompt(questions.source).then(function(answers) {
		var args = {
			sourcePath: slugify(answers.source),
			buildPath: '',
			themePath: '',
			theme: 'default'
		};
		askBuild(args);
	});
}

function askBuild(args) {
	inquirer.prompt(questions.build).then(function(answers) {
		args.buildPath = slugify(answers.build);
		save(args);
	});
}

function save(args) {
	var sourcePath = path.join(cwd, args.sourcePath),
		viewsPath = path.join(sourcePath, 'pages'),
		indexPath = path.join(viewsPath, 'index.md'),
		config = path.join(cwd, 'doc-smith.json'),
		stub = helper.getStub('doc.md'),
        content = helper.format(stub, {title: 'Home', collection: 'home'});

    fs.mkdirSync(sourcePath);
    fs.mkdirSync(viewsPath);

    fs.writeFile(indexPath, content, function(err) {
        if (err) {
            return console.log(err);
        }
    });

    fs.writeFile(config, JSON.stringify(args, null, 2), function(err) {
        if (err) {
            return console.log(err);
        }
    });
    console.log('doc-smith initialized!');
}

askSource();