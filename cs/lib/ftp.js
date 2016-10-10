/* jshint node: true */
'use strict';

var fs = require('fs'),
    path = require('path'),
    Ftp = require('ftp'),
    async = require('async'),
    inquirer = require('inquirer'),
    helper = require('./helper.js'),
    cwd = process.cwd(),
    config = require(path.join(cwd, 'coppersmith.json')),
    publishConfig = config.publish.config,
    ftp = new Ftp(),
    sourcePath = path.join(cwd, config.buildPath),
    remotePath = config.publish.destination,
    partialDirectories = [],
    partialFilePaths = [],
    transferredFileCount = 0,
    question = {
        type: 'password',
        name: 'password',
        message: 'Please type the password for ' + publishConfig.host
    },
    _self = this;

// A utility function to remove lodash/underscore dependency
// Checks an obj for a specified key
function has (obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

// Get a list of source directories.
exports.parseDirectories = function(startDir, result) {
    var files;
    var i;
    var tmpPath;
    var currFile;

    // Initialize the `result` object if it is the first iteration
    if (result === undefined) {
        result = {};
        result[path.sep] = [];
    }

    // Iterate throught the contents of the `startDir` location of the current iteration
    files = fs.readdirSync(startDir);
    for (i = 0; i < files.length; i++) {
        currFile = path.join(startDir, files[i]);

        if (fs.lstatSync(currFile).isDirectory()) {
            tmpPath = path.relative(sourcePath, currFile);

            if (!has(result, tmpPath)) {
                result[tmpPath] = [];
                partialDirectories.push(tmpPath);
            }
            _self.parseDirectories(currFile, result);
        } else {
            tmpPath = path.relative(sourcePath, startDir);
            if (!tmpPath.length) {
                tmpPath = path.sep;
            }

            // check exclude rules
            var partialFilePath = path.join(tmpPath, files[i]);
            result[tmpPath].push(files[i]);
            partialFilePaths.push(partialFilePath);
        }
    }

    return result;
}

// Make all remote directories if needed.
exports.makeDirectories = function(cb) {
    async.eachSeries(partialDirectories, _self.makeDirectory, function (err) {
        cb(err);
    });
}

// Make a remote directory if it doesn't exist.
exports.makeDirectory = function(partialRemoteDirectory, cb) {
    // add the remote path, and clean up the slashes
    var fullRemoteDirectory = remotePath + '/' + partialRemoteDirectory.replace(/\\/gi, '/');
    
    // add leading slash if it is missing
    if (fullRemoteDirectory.charAt(0) !== '/') {
        fullRemoteDirectory = '/' + fullRemoteDirectory;
    }
    
    // remove double // if present
    fullRemoteDirectory = fullRemoteDirectory.replace(/\/\//g, '/');
    ftp.cwd(fullRemoteDirectory, function(err) {
        if (err) {
            ftp.mkdir(fullRemoteDirectory, function(err) {
                if(err) {
                    helper.log.error('-- ERROR: ' + err);
                    cb(err);
                } else {
                    _self.makeDirectory(partialRemoteDirectory, cb);
                }
            });
        } else {
            cb();
        }
    });
}

// Upload a single file.
exports.putFile = function(partialFilePath, cb) {
    helper.log.dark('PUT: ' + partialFilePath);
    var remoteFilePath = remotePath + '/' + partialFilePath;
        remoteFilePath = remoteFilePath.replace(/\\/g, '/');
        
    var fullLocalPath = path.join(sourcePath, partialFilePath);
    
    var data = {
        totalFileCount: partialFilePaths.length,
        transferredFileCount: transferredFileCount,
        percentComplete: Math.round((transferredFileCount / partialFilePaths.length) * 100),
        filename: partialFilePath
    };
    
    ftp.put(fullLocalPath, remoteFilePath, function (err) {
        if (err) {
            helper.log.error('PUT: ' + partialFilePath);
            helper.log.error('-- ERROR: ' + err);
            cb(err);
        } else {
            helper.log.success('PUT: ' + partialFilePath);
            transferredFileCount++;
            data.transferredFileCount = transferredFileCount;
            cb();
        }
    });
}

// Required function to start the publishing, called by [copper publish] command.
exports.deploy = function(cb) {
    helper.log.info('Publishing not ready yet.');

    if (!publishConfig.password) {
        inquirer.prompt(question).then(function(answers) {
            publishConfig.password = answers.password;
            _self.start(publishConfig, cb);
        });
    } else {
        _self.start(publishConfig, cb);
    }
}

// Starts the publishing.
exports.start = function(config, cb) {

    var conf = {
        host: config.host,
        port: config.port,
        user: config.username,
        password: config.password
    };

    var toTransfer = _self.parseDirectories(sourcePath);

    ftp.on('ready', function() {
        _self.makeDirectories(function(err) {
            if (err) {
                helper.log.error('-- ERROR: ' + err);
                cb(err);
            } else {
                ftp.cwd('/', function(err) {
                    async.eachSeries(partialFilePaths, _self.putFile, function (err) {
                        ftp.end();
                        cb(err);
                    });
                });
            }
        })
    });

    ftp.connect(conf);
}