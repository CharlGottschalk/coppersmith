var metalsmith = require('metalsmith'),
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
	handlebars = require('./handlebars.js'),
	helper = require('./helper.js'),
	cwd = process.cwd(),
	config = require(path.join(cwd, 'doc-smith.json')),
	sourcePath = path.join(cwd, config.sourcePath, 'pages'),
	buildPath = path.join(cwd, config.buildPath),
	theme = helper.getTheme(config.theme),
	themePath = path.join(helper.getThemePath(config.themePath, cwd), theme),
	themeLayoutsPath = path.join(themepath, 'layouts'),
	themePartialsPath = path.join(themepath, 'partials'),
	themeAssetsPath = path.join(themepath, 'assets');

metalsmith(sourcePath)
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
	.use(collections())
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
		directory: themeLayoutsPath,
		default: 'master.html',
		pattern: '**/*.html',
		'partials': themePartialsPath,
		engine: 'handlebars'
	}))
	.use(assets({
	  source: themeAssetsPath,
	  destination: path.join(buildPath, 'assets')
	}))
	.build(function(err) {
		if (err) {
			throw err;
		}
	});