var fs = require('fs'),
	path = require('path');

exports.getStub = function(stub) {
    var content = fs.readFileSync(path.join(__dirname,'stubs',stub), 'utf8');
    return content;
}

exports.format = function(content, values) {
    content = content.replace(/\[title\]/gim, values.title);
    return content.replace(/\[collection\]/gim, values.collection);
}

exports.titleCase = function(string) {
    var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
    return string.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
        if (index > 0 && index + match.length !== title.length &&
            match.search(smallWords) > -1 && title.charAt(index - 2) !== ':' &&
            (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
            title.charAt(index - 1).search(/[^\s-]/) < 0) {
            return match.toLowerCase();
        }

        if (match.substr(1).search(/[A-Z]|\../) > -1) {
            return match;
        }

        return match.charAt(0).toUpperCase() + match.substr(1);
    });
}

exports.getThemePath = function(path, cwd) {
    if (!path || path === '')
    {
        return path.join(__dirname, '../themes');
    }
    return path.join(cwd, path);
}

exports.getTheme = function(theme) {
    if (!theme || theme === '')
    {
        return 'default';
    }
    return theme;
}