var path = require('path'),
	fs = require('fs'),
	handlebars = require('handlebars'),
	helper = require('./helper.js');

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

handlebars.registerHelper('snippet', function (name, context) {
	var collection = context.data.root.collection,
		page = titleCase(context.data.root.title),
		snippet = '';
	if (collection === 'root') {
		snippet = path.join(__dirname, '/src/pages/_snippets', name + '.html');
	} else {
		snippet = path.join(__dirname, '/src/pages/', collection, page, '_snippets', name + '.html');
		try {
			var exists = fs.statSync(snippet);
		} catch(e) {
			snippet = path.join(__dirname, '/src/pages/_snippets', name + '.html');
		}
	}
	var content = fs.readFileSync(snippet, 'utf8');
    return content;
});

handlebars.registerHelper('titleCase', function (string) {
	return helper.titleCase(string);
});