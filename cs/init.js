/* jshint node: true */
'use strict';

var inquirer = require('inquirer'),
	fs = require('fs'),
	path = require('path'),
	slugify = require('slugify'),
	helper = require('./helper.js'),
	cwd = process.cwd(),
	pkg = require(path.join(cwd, 'package.json')),
	defaultAuthor = pkg.author || '',
	date = helper.getDate();

var questions = {
		source: {
			type: 'input',
			name: 'source',
			message: 'Where would you like to keep your source files?',
			default: 'docs'
		},
		build: {
			type: 'input',
			name: 'build',
			message: 'Where would you like your generated files to go?',
			default: 'build'
		},
		author: {
			type: 'input',
			name: 'author',
			message: 'Who is the default author?',
			default: defaultAuthor
		},
	};

function askSource() {
	helper.log.dark('CopperSmith: Initialize');
	helper.log.info('Please answer the following questions:');
	inquirer.prompt(questions.source).then(function(answers) {
		var args = {
			sourcePath: slugify(answers.source),
			buildPath: '',
			themePath: '',
			theme: 'default',
			theme_options: {
				skin: 'black-light'
			},
			author: defaultAuthor
		};
		askBuild(args);
	});
}

function askBuild(args) {
	inquirer.prompt(questions.build).then(function(answers) {
		args.buildPath = slugify(answers.build);
		askAuthor(args);
	});
}

function askAuthor(args) {
	inquirer.prompt(questions.author).then(function(answers) {
		args.author = helper.titleCase(answers.author);
		save(args);
	});
}

function save(args) {
	var sourcePath = path.join(cwd, args.sourcePath),
		viewsPath = path.join(sourcePath, 'pages'),
		indexPath = path.join(viewsPath, 'index.md'),
		config = path.join(cwd, 'coppersmith.json'),
		stub = helper.getStub('home.md'),
		replace = {
			author: defaultAuthor,
			date: date
		},
        content = helper.format(stub, replace);

    fs.mkdirSync(sourcePath);
    fs.mkdirSync(viewsPath);

    fs.writeFile(indexPath, content, function(err) {
        if (err) {
            throw err;
        }
    });

    fs.writeFile(config, JSON.stringify(args, null, 2), function(err) {
        if (err) {
            throw err;
        }
    });
    helper.log.success('CopperSmith: Initialized!');
}

askSource();