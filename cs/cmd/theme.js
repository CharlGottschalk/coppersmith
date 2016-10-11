/* jshint node: true */
'use strict';

var inquirer = require('inquirer'),
	fs = require('fs'),
	path = require('path'),
	slugify = require('slugify'),
	helper = require('../lib/helper.js'),
	cwd = process.cwd(),
	config = require(path.join(cwd, 'coppersmith.json')),
	questions = {
		title: {
			type: 'input',
			name: 'title',
			message: 'What would you like to call your theme?'
		}
	};

function askTitle() {
	helper.log.dark('CopperSmith: Theme');
	helper.log.info('Please answer the following questions:');
	inquirer.prompt(questions.title).then(function(answers) {
		var args = {
			title: helper.titleCase(answers.title),
			slug: slugify(answers.title),
			paths: {}
		};
		save(args);
	});
}

function getPaths(args) {
	var templatePath = path.join(cwd, config.sourcePath, 'templates'),
		themePath = path.join(templatePath, args.slug),
		assetsPath = path.join(themePath, 'assets'),
		layoutsPath = path.join(themePath, 'layouts'),
		partialsPath = path.join(themePath, 'partials'),
		cssPath = path.join(assetsPath, 'css'),
		jsPath = path.join(assetsPath, 'js');

	var paths = {
		root: config.sourcepath,
		template: {
			template: {
				path: templatePath,
				message: 'Template directory: ' + templatePath
			},
			theme: {
				path: themePath,
				message: args.title + ' directory: ' + themePath
			},
			layouts: {
				path: layoutsPath,
				message: args.title + ' layouts directory: ' + layoutsPath
			},
			partials: {
				path: partialsPath,
				message: args.title + ' partials directory: ' + partialsPath
			},
			assets: {
				path: assetsPath,
				message: args.title + ' assets directory: ' + assetsPath
			},
			css: {
				path: cssPath,
				message: args.title + ' css directory: ' + cssPath
			},
			js: {
				path: jsPath,
				message: args.title + ' js directory: ' + jsPath
			}
		},
		stubs: {
			layout: {
				path: path.join(layoutsPath, 'master.html'),
				stub: 'layout.html',
				message: args.title + ' master layout: ' + path.join(layoutsPath, 'master.html')
			},
			head: {
				path: path.join(partialsPath, 'head.html'),
				stub: 'head.html',
				message: args.title + ' head partial: ' + path.join(partialsPath, 'head.html')
			},
			nav: {
				path: path.join(partialsPath, 'nav.html'),
				stub: 'nav.html',
				message: args.title + ' nav partial: ' + path.join(partialsPath, 'nav.html')
			},
			footer: {
				path: path.join(partialsPath, 'footer.html'),
				stub: 'footer.html',
				message: args.title + ' footer partial: ' + path.join(partialsPath, 'footer.html')
			},
			scripts: {
				path: path.join(partialsPath, 'scripts.html'),
				stub: 'scripts.html',
				message: args.title + ' scripts partial:' + path.join(partialsPath, 'scripts.html')
			},
			css: {
				path: path.join(cssPath, 'app.css'),
				stub: 'app.css',
				message: args.title + ' css: ' + path.join(cssPath, 'app.css')
			},
			js: {
				path: path.join(jsPath, 'app.js'),
				stub: 'app.js',
				message: args.title + ' js: ' + path.join(jsPath, 'app.js')
			}
		}
	};
	
	return paths;
}

function save(args) {
	var paths = getPaths(args),
		property, stub, messages = [];

	for (property in paths.template) {
		if (paths.template.hasOwnProperty(property)) {
		    if (!fs.existsSync(paths.template[property].path)) {
		    	fs.mkdirSync(paths.template[property].path);
		    	messages.push(paths.template[property].message);
		    }
		}
	}

	for (property in paths.stubs) {
		if (paths.stubs.hasOwnProperty(property)) {
			if (!fs.existsSync(paths.stubs[property])) {
				stub = helper.getStub('template/' + paths.stubs[property].stub);
		    	fs.writeFileSync(paths.stubs[property].path, stub);
				messages.push(paths.stubs[property].message);
		    }
		}
	}

	config.template.path = config.sourcePath + '/' + 'templates';
	config.template.theme = args.slug;

	fs.writeFileSync(path.join(cwd, 'coppersmith.json'), JSON.stringify(config, null, 2));

    helper.log.success('CopperSmith: Theme Complete.');
    helper.log.info('The following were created:');
    for (var i = 0; i < messages.length; i++) {
		helper.log.mag(messages[i]);
	}
	helper.log.info('coppersmith.json updated.');
}

askTitle();