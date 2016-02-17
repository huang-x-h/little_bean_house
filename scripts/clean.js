/**
 * Created by huangxinghui on 2016/2/17.
 */

var fs = require('fs');
var path = require('path');
var untrimmedPath = './public/images/untrimmed';
var trimPath = './public/images/trim/';

function cleanFolder(folder) {
  fs.readdir(folder, function(err, files) {
    if (err) return;

    files.forEach(function(file) {
      fs.unlink(path.join(folder, file))
    })
  });
}

cleanFolder(untrimmedPath);
cleanFolder(trimPath);
