/* jshint node: true */
'use strict';

var path = require('path'),
    fs = require('fs'),
    Client = require('ftp'),
    helper = require('./helper.js'),
    cwd = process.cwd(),
    config = require(path.join(cwd, 'coppersmith.json')),
    settings = config.publish.config,
    options = {
        logging: 'basic'
    },
    c = new Client(),
    sourcePath = path.join(cwd, config.buildPath),
    destinationPath = config.publish.destination,
    destParts = [],
    sourceFiles = [],
    cdup = 0,
    cancelled = false;

function loadSourceFiles(dir) {
    var files = fs.readdirSync(dir);

    var i = files.length;
    while(i--) {
        if (fs.statSync(path.join(dir, files[i])).isDirectory()) {
            loadSourceFiles(path.join(dir, files[i]));
        } else {
            var file = path.join(dir, files[i]),
                index = ((file.lastIndexOf(config.buildPath) + config.buildPath.length) + 1),
                base = file.substring(index);
            sourceFiles.push(base);
        } 
    }
}

function changeToRootDirectory(cb) {
    if (cancelled) {
        return;
    }
    while (cdup--) {
        if(!cancelled) {
            c.cdup(function(err) {
                if (err)
                {
                    cancel(err);
                }
            });
        }
    }

    cb();
}

function changeDirectory(directory, make) {
    helper.log.dark('Changing Directory to ' + directory);

    return new Promise(function(resolve, reject) {
        c.cwd(directory, function(err, currentDir) {
            if(err) {
                if (make) {
                    makeDirectory(directory).then(function() {
                        changeDirectory(directory, false).then(function() {
                            resolve();
                        }, function() {
                            reject();
                        });
                    }, function() {
                        reject();
                    });
                } else {
                    reject();
                }
            } else {
                helper.log.info('Changed directory to ' + directory);
                resolve();
            }
        });
    });
}

function changeDirectories(directories, index, cb) {
    if (cancelled) {
        return;
    }

    changeDirectory(directories[index], true).then(function() {
        index++;
        if (index < directories.length) {
            changeDirectories(directories, index, cb);
        } else {
            cb();
        }
    }, function() {
        cancel();
    });
}

function makeDirectory(directory) {
    helper.log.dark('Making Directory ' + directory);

    return new Promise(function(resolve, reject) {
        c.mkdir(directory, function(err) {
            if (err) {
                reject();
            } else {
                helper.log.info('Made Directory ' + directory);
                resolve();
            }
        });
    });
}

function putFile(source, dest) {
    if (cancelled) {
        return;
    }
    c.put(source, dest, function(err) {
        if (err) {
            cancel(err);
        };
    });
}

function putSourceFiles(cb) {
    if (cancelled) {
        return;
    }
    var i = sourceFiles.length;

    while (i--)
    {
        changeToRootDirectory(function() {
            if (!cancelled) {
                var file = sourceFiles[i],
                    parts = file.split(path.sep);

                helper.log.dark('CopperSmith: Publishing File ' + file);

                if (parts.length > 1) {
                    for (var x = 0; x < parts.length - 1; x++) {
                        changeDirectory(parts[x], true);
                        cdup++;
                    }
                    putFile(path.join(sourcePath, sourceFiles[i]), parts[parts.length - 1]);
                } else {
                    putFile(path.join(sourcePath, sourceFiles[i]), parts[0]);
                } 
            }
        });
    }

    cb();
}

function connect() {
    c.connect(settings);
}

function cancel(err) {
    cancelled = true;
    helper.log.error(err);
    c.end();
    helper.log.dark('CopperSmith: Publishing Cancelled.');
}

function stop() {
    if (!cancelled) {
        c.end();
        helper.log.success('CopperSmith: Publishing Complete.');
    }
}
 
c.on('ready', function() {
    var destParts = destinationPath.split('/');

    changeDirectories(destParts, 0, function() {
        // putSourceFiles(function() {
        //     stop();
        // });
        console.log('end');
    });

    // c.list(function(err, list) {
    //     if (err) throw err;
    //     console.dir(list);
    //     c.end();
    // });
});

loadSourceFiles(sourcePath);

connect();