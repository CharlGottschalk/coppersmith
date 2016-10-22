/* jshint node: true */
'use strict';

var path = require('path'),
	helper = require('../lib/helper.js'),
	pkg = require(path.join(__dirname, '../../package.json'));

helper.log.dark('====== Using CopperSmith ======');
helper.log.dark('Version ' + pkg.version);
helper.log.dark('-------------------------------');
helper.log.success('$ copper init');
helper.log.info('Initializes CopperSmith');
helper.log.dark('-------------------------------');
helper.log.success('$ copper page');
helper.log.info('Add new pages');
helper.log.dark('-------------------------------');
helper.log.success('$ copper snip');
helper.log.info('Add new snippets');
helper.log.dark('-------------------------------');
helper.log.success('$ copper build');
helper.log.info('Generate static files');
helper.log.dark('-------------------------------');
helper.log.success('$ copper theme');
helper.log.info('Quickly scaffold a directory for a custom  template');
helper.log.dark('-------------------------------');
helper.log.success('$ copper publish');
helper.log.info('Publish to FTP server');