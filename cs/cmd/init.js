/* jshint node: true */
'use strict';

var inquirer = require('inquirer'),
	fs = require('fs'),
	path = require('path'),
	slugify = require('slugify'),
	helper = require('../lib/helper.js'),
	cwd = process.cwd(),
	pkg = require(path.join(cwd, 'package.json')),
	defaultAuthor = pkg.author || '',
	date = helper.getDate();

var templates = [
		'default'
	],
	skins = [
		'black',
		'black-light',
		'blue',
		'blue-light',
		'green',
		'green-light',
		'purple',
		'purple-light',
		'red',
		'red-light',
		'yellow',
		'yellow-light'
	],
	questions = {
		name: {
			type: 'input',
			name: 'name',
			message: 'What is your site called?',
		},
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
		template: {
			type: 'list',
			name: 'template',
			message: 'What template would you like to use?',
			choices: templates
		},
		skin: {
			type: 'list',
			name: 'skin',
			message: 'What skin would you like?',
			choices: skins
		}
	};

function askName() {
	helper.log.dark('CopperSmith: Initialize');
	helper.log.info('Please answer the following questions:');
	inquirer.prompt(questions.name).then(function(answers) {
		var args = {
			name: answers.name,
			author: defaultAuthor,
			sourcePath: '',
			buildPath: '',
			base: 'http://domain.com',
			template: {
				path: '',
				theme: 'default',
				skin: 'black-light'
			},
			options: {
				copyright_year: '2016',
				copyright_url: 'http://domain.com',
				copyright_display: answers.name
			},
			publish: {
				to: 'ftp',
				destination: 'public_html/destination/folder',
				config: {
					host: 'ftp.domain.com',
					port: 21,
					username: 'username',
					password: 'password'
				}
			}
		};
		askSource(args);
	});
}

function askSource(args) {
	inquirer.prompt(questions.source).then(function(answers) {
		args.sourcePath = slugify(answers.source);
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
		askTemplate(args);
	});
}

function askTemplate(args) {
	inquirer.prompt(questions.template).then(function(answers) {
		args.template.theme = answers.template;
		askSkin(args);
	});
}

function askSkin(args) {
	inquirer.prompt(questions.skin).then(function(answers) {
		args.template.skin = answers.skin;
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
    fs.writeFileSync(indexPath, content);
    fs.writeFileSync(config, JSON.stringify(args, null, 2));
    helper.log.success('CopperSmith: Initialized!');
}

askName();