/* jshint node: true */
'use strict';

var fs = require('fs'),
	path = require('path'),
    chalk = require('chalk');

exports.slugify = function(value) {
    return value.replace(/\s/g, '-').toLowerCase().trim();
};

exports.getStub = function(stub) {
    var content = fs.readFileSync(path.join(__dirname,'../stubs',stub), 'utf8');
    return content;
};

exports.format = function(content, values) {
    if (values.title) {
        content = content.replace(/\[title\]/gim, values.title);
    }
    if (values.collection) {
        content = content.replace(/\[collection\]/gim, values.collection);
    }
    if (values.author) {
        content = content.replace(/\[author\]/gim, values.author);
    }
    if (values.date) {
        content = content.replace(/\[date\]/gim, values.date);
    }
    if (values.version) {
        content = content.replace(/\[version\]/gim, values.version);
    }
    if (values.draft || !values.draft) {
        content = content.replace(/\[draft\]/gim, values.draft);
    }
    return content;
};

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
};

exports.getThemePath = function(dir, cwd) {
    if (!dir || dir === '')
    {
        return path.join(__dirname, '../../templates');
    }
    return path.join(cwd, dir);
};

exports.getTheme = function(template) {
    if (!template || template === '')
    {
        return 'default';
    }
    return template;
};

exports.getDate = function() {
    var now = new Date(),
        day = now.getDate(),
        month = now.getMonth() + 1,
        year = now.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }

    if (month < 10) {
        month = '0' + month;
    }

    return day + '/' + month + '/' + year;
};

exports.log = {
    error: function(message) {
        console.log(chalk.bold.red(message));
    },
    info: function(message) {
        console.log(chalk.bold.blue(message));
    },
    success: function(message) {
        console.log(chalk.bold.green(message));
    },
    dark: function(message) {
        console.log(chalk.bold.black(message));
    },
    mag: function(message) {
        console.log(chalk.bold.magenta(message));
    },
    yel: function(message) {
        console.log(chalk.bold.yellow(message));
    },
    wht: function(message) {
        console.log(chalk.bold.white(message));
    }
};

exports.deepValue = function(obj, path){
    for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
        obj = obj[path[i]];
    };
    return obj;
};