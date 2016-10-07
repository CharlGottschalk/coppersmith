/* jshint node: true */
'use strict';

var path = require('path'),
	helper = require('../lib/helper.js'),
    cwd = process.cwd(),
    config = require(path.join(cwd, 'coppersmith.json'));

    helper.log.dark('CopperSmith: Publishing')
    
    require('../lib/' + config.publish.to + '.js');