/* jshint node: true */
'use strict';

var path = require('path'),
	helper = require('../lib/helper.js'),
    cwd = process.cwd(),
    config = require(path.join(cwd, 'coppersmith.json'));
    
    var publisher = require('../lib/' + config.publish.to + '.js');

    publisher.deploy(function(err) {
        if (err) {
            helper.log.error('CopperSmith: Publishing Incomplete');
        } else {
            helper.log.success('CopperSmith: Publishing Complete');
        }
    });