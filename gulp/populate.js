
'use strict';

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  fs = require('fs'),
  path = require('path'),
  walk = require('walkdir'),
  prompt = require('prompt'),
  Firebase = require('firebase');


gulp.task('populate:make', false, function(done) {

  var dataObj = {};

  // generate the rules JSON to send to Firebase
  return walk('firebase/populate')
  .on('file', function(pathname) {

    if (path.extname(pathname) === '.json') {

      var relativePath = path.relative(path.join(process.cwd(), 'firebase', 'populate'), pathname);

      var attachPath = path.dirname(relativePath)
      .replace(/^\.\/?/g, '')
      .split(path.sep);

      var attachPoint = attachPath.reduce(function(obj, pathPart) {

        if (pathPart.length === 0) {
          return obj;
        }

        if (!obj.hasOwnProperty(pathPart) || typeof obj[pathPart] !== 'object') {
          obj[pathPart] = {};
        }

        return obj[pathPart];

      }, dataObj);

      attachPoint[path.basename(relativePath, '.json')] = require(pathname);

    }

  })
  .on('end', function() {
    fs.writeFile('build/populate.json', JSON.stringify(dataObj, undefined, 2), done);
  });

});


gulp.task('populate', 'Overwrite Firebase with seed data.', ['populate:make'], function(done) {

  if (!process.env.FIREBASE_URL ||
    !process.env.FIREBASE_AUTH_SECRET) {

    gutil.log('ERROR: Please make sure FIREBASE_URL and FIREBASE_AUTH_SECRET are set.');
    done();
    return;

  }

  var root = new Firebase(process.env.FIREBASE_URL);
  root.authWithCustomToken(process.env.FIREBASE_AUTH_SECRET, function(err) {

    if (err) {
      throw err;
    }

    var firebaseName = process.env.FIREBASE_URL.split(/\./)[0];

    gutil.log(
      'YOU ARE ABOUT TO ERASE ' +
      gutil.colors.bgRed(process.env.FIREBASE_URL) +
      '!'
    );
    prompt.delimiter = '';
    prompt.message = '';
    prompt.start();
    prompt.get({
      name: 'name',
      description: 'Type "' + firebaseName + '" to proceed:',
    }, function(err, result) {

      if (err) {

        gutil.log();
        gutil.log(err.message);
        done();

      } else if (result.name !== firebaseName) {

        gutil.log('You didn\'t retype the name of your Firebase correctly.');
        gutil.log('Operation canceled.');
        done();

      } else {

        gutil.log('Erasing ' + process.env.FIREBASE_URL + ' because you told me to.');
        root.set(require('../build/populate.json'), function(err) {
          setTimeout(process.exit, 100);
          done(err);
        });

      }

    });

  });

});
