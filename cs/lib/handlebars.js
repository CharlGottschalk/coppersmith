/* jshint node: true */
'use strict';

var path = require('path'),
	fs = require('fs'),
    url = require('url-join'),
	handlebars = require('handlebars'),
	helper = require('./helper.js'),
    cwd = process.cwd(),
    config = require(path.join(cwd, 'coppersmith.json'));

handlebars.registerHelper('is', function (left, operator, right, options) {
    switch (operator) {
        case '==':
        case '===':
            return (left === right) ? options.fn(this) : options.inverse(this);
        case '!=':
        case '!==':
        	return (left !== right) ? options.fn(this) : options.inverse(this);
        case '<':
            return (left < right) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (left <= right) ? options.fn(this) : options.inverse(this);
        case '>':
            return (left > right) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (left >= right) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (left && right) ? options.fn(this) : options.inverse(this);
        case '||':
            return (left || right) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

handlebars.registerHelper('notroot', function (key, options) {
    if (key !== 'root' && key !== 'home') {
        return options.fn(this);
    }
});

handlebars.registerHelper('asset', function (name, context) {
    return url(config.base, 'assets', name);
});

handlebars.registerHelper('snippet', function (name, context) {
	var collection = context.data.root.collection,
		page = helper.titleCase(context.data.root.title),
		snippet = '',
        exists = false;
	if (collection === 'home') {
		snippet = path.join(cwd, config.sourcePath, 'pages', '_snippets', name + '.html');
	} else if (collection === 'root') {
        snippet = path.join(cwd, config.sourcePath, 'pages', 'root', '_snippets', name + '.html');
    } else {
		snippet = path.join(cwd, config.sourcePath, 'pages', collection, '_snippets', name + '.html');
		try {
			exists = fs.statSync(snippet);
		} catch(e) {
			snippet = path.join(cwd, config.sourcePath, 'pages', '_snippets', name + '.html');
		}
	}
	var content = fs.readFileSync(snippet, 'utf8');
    return content;
});

handlebars.registerHelper('titleCase', function (string) {
	return helper.titleCase(string);
});

handlebars.registerHelper('skin', function () {
    return config.template.skin;
});

handlebars.registerHelper('config', function (name) {
    return helper.deepValue(config, name);
});

handlebars.registerHelper('option', function (name) {
    return helper.deepValue(config.options, name);
});

handlebars.registerHelper('template', function (name) {
    return helper.deepValue(config.template, name);
});

handlebars.registerHelper('has', function (name, options) {
    if (helper.deepValue(config, name)) {
        return options.fn(this);
    }
});