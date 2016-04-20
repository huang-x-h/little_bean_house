/**
 * Created by huangxinghui on 2016/1/14.
 */

var gm = require('gm');
var moment = require('moment');
var Promise = require('bluebird');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var untrimmedPath = './public/images/untrimmed';
var trimPath = './public/images/trim/';
var originalPath = './public/images/original/';
var destPath = './public/images/little_bean';
var profile = require('./profile');
var nameMap = {};
var fileExt = '.jpg';

fs.readdir(untrimmedPath, function(err, files) {
  if (err) return;

  var promises = [];
  // change chinese name, because imagemagick dose not known
  files.forEach(function(file) {
    if (fs.statSync(path.join(untrimmedPath, file)).isFile()) {
      promises.push(new Promise(function(resolve, reject) {
        changeTempName(file, function(fileName) {
          convertImage(fileName, destPath, resolve);
        });
      }));
    }
  });

  Promise.all(promises).then(function(data) {
    profile.refreshProfile(data);
  })
});

function changeTempName(filePath, callback) {
  var fileName = path.basename(filePath, fileExt.toUpperCase());
  var hashName = crypto.createHash('md5').update(fileName).digest('hex');
  nameMap[hashName] = fileName.substring(fileName.indexOf(' ') + 1);

  var rs = fs.createReadStream(path.join(untrimmedPath, filePath));
  rs.pipe(fs.createWriteStream(path.join(trimPath, hashName + fileExt)));
  rs.on('end', function() {
    callback(hashName);
  });
}

function convertImage(fileName, destPath, resolve) {
  var filePath = path.join(trimPath, fileName + fileExt);

  gm(filePath).identify(function(err, metadata) {
    if (err) throw err;

    var originalDate = moment(metadata['Profile-EXIF']['Date Time Original'], 'YYYY:MM:DD HH:mm:ss');
    var newFileName = originalDate.format('YYYYMMDD-HHmmss') + fileExt;

    // copy original image order by dateTimeOriginal
    fs.createReadStream(filePath).pipe(
        fs.createWriteStream(path.join(originalPath, newFileName)));

    // resize image
    gm(filePath)
        .resize(750)
        .write(path.join(destPath, newFileName),  function(err, stdout, stderr) {
          if (err) throw err;
          console.log('resized', filePath);
        });

    var data = {};
    data.startDate = originalDate.format('YYYY,M,D');
    data.headline = originalDate.format('M月D号');
    data.text = nameMap[fileName];
    data.asset = {
      media: 'images/little_bean/' + newFileName,
      credit: '',
      caption: ''
    };

    resolve(data);
  });
}