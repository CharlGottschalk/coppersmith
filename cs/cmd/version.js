/* jshint node: true */
'use strict';

var path = require('path'),
	helper = require('../lib/helper.js'),
	pkg = require(path.join(__dirname, '../../package.json'));

helper.log.info('Version ' + pkg.version);