var path = require('path'),
	fs = require('fs'),
	handlebars = require('handlebars'),
    slugify = require('slugify'),
	helper = require('./helper.js'),
    cwd = process.cwd(),
    config = require(path.join(cwd, 'coppersmith.json'));

handlebars.registerHelper('is', function (left, operator, right, options) {
    switch (operator) {
        case '==':
            return (left == right) ? options.fn(this) : options.inverse(this);
        case '===':
            return (left === right) ? options.fn(this) : options.inverse(this);
        case '!=':
        	return (left != right) ? options.fn(this) : options.inverse(this);
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

handlebars.registerHelper('asset', function (name, context) {
    var collection = context.data.root.collection[0],
        page = slugify(context.data.root.title),
        url = '';
    if (collection === 'home') {
        url = 'assets/' + name;
    } else if (collection === 'root') {
        url = '../assets/' + name;
    } else {
        url = '../../assets/' + name;
    }
    return url;
});

handlebars.registerHelper('snippet', function (name, context) {
	var collection = context.data.root.collection,
		page = helper.titleCase(context.data.root.title),
		snippet = '';
	if (collection === 'home') {
		snippet = path.join(cwd, config.sourcePath, 'pages', '_snippets', name + '.html');
	} else if (collection === 'root') {
        snippet = path.join(cwd, config.sourcePath, 'pages', page, '_snippets', name + '.html');
    } else {
		snippet = path.join(cwd, config.sourcePath, 'pages', collection, page, '_snippets', name + '.html');
		try {
			var exists = fs.statSync(snippet);
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