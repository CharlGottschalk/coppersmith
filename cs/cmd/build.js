/* jshint node: true */
'use strict';

var fs = require('fs'),
	metalsmith = require('metalsmith'),
	collections = require('metalsmith-collections'),
	inplace = require('metalsmith-in-place'),
	drafts = require('metalsmith-drafts'),
	markdown = require('metalsmith-markdown'),
	headings = require('metalsmith-headings'),
	permalinks = require('metalsmith-permalinks'),
	layouts = require('metalsmith-layouts'),
	ignore = require('metalsmith-ignore'),
	assets = require('metalsmith-assets'),
	path = require('path'),
	helper = require('../lib/helper.js'),
	cwd = process.cwd(),
	config = require(path.join(cwd, 'coppersmith.json')),
	sourcePath = path.join(cwd, config.sourcePath, 'pages'),
	buildPath = path.join(cwd, config.buildPath),
	template = helper.getTheme(config.template.theme),
	templatePath = path.join(helper.getThemePath(config.template.path, cwd), template),
	templateLayoutsPath = path.join(templatePath, 'layouts'),
	templatePartialsPath = path.join(templatePath, 'partials'),
	templateAssetsPath = path.join(templatePath, 'assets'),
	collectionOptions = {};

require('../lib/handlebars.js');

helper.log.dark('CopperSmith: Build Started...');

function checkBuildPath() {
	var compare = path.join(cwd, config.sourcePath);
	var current = path.join(cwd, '');
	if (!config.sourcePath) {
		return false;
	}
	if (current === compare) {
		return false;
	}
	return true;
}

function loadCollections(cb) {
	if (!checkBuildPath() ) {
		sourcePath = path.join(cwd, 'build', 'pages')
	}
	var dirs = fs.readdirSync(sourcePath).filter(function(file) {
		return fs.statSync(path.join(sourcePath, file)).isDirectory() && !file.startsWith('_');
	});
	var i = dirs.length;
	if (i > 0) {
		while(i--) {
			collectionOptions[dirs[i]] = {sortBy: 'sort'};
		}
	}

	cb();
}

loadCollections(function() {
	metalsmith(sourcePath)
		.source('')
	  	.destination(buildPath)
	  	.use(ignore([
	  			'*.html',
	  			'**/*.html'
	  		]))
		.use(drafts())
		.use(inplace({
			engine: 'handlebars',
			pattern: '**/*.md'
		}))
		.use(collections(collectionOptions))
		.use(markdown({
			smartypants: true,
			smartLists: true,
			gfm: true,
			tables: true
		}))
		.use(headings('h2'))
		.use(permalinks({
			pattern: ':collection/:title',
			linksets: [{
					match: { collection: 'home' },
					pattern: ''
				},{
					match: { collection: 'root' },
					pattern: ':title'
				}]
		}))
		.use(layouts({
			directory: templateLayoutsPath,
			default: 'master.html',
			pattern: '**/*.html',
			'partials': templatePartialsPath,
			engine: 'handlebars'
		}))
		.use(assets({
		  source: templateAssetsPath,
		  destination: path.join(buildPath, 'assets')
		}))
		.build(function(err) {
			if (err) {
				throw err;
			}
		});
});

helper.log.success('CopperSmith: Build Complete!');