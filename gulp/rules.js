
'use strict';

var gulp = require('gulp'),
  fs = require('fs'),
  https = require('https'),
  targaryen = require('targaryen'),
  path = require('path'),
  walk = require('walkdir');


gulp.task('rules:build', false, function() {

  var rulesObj = {};

  // generate the rules JSON to send to Firebase
  return walk('firebase/rules')
  .on('file', function(pathname) {

    if (path.extname(pathname) === '.json') {

      // get and validate the rules
      var rules = require(pathname);
      targaryen.setFirebaseRules({ rules: rules });

      var relativePath = path.relative(path.join(process.cwd(), 'firebase', 'rules'), pathname);

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

      }, rulesObj);

      attachPoint[path.basename(relativePath, '.json')] = rules;

    }

  })
  .on('end', function() {
    fs.writeFileSync('build/rules.json', JSON.stringify({ rules: rulesObj }, undefined, 2));
  });

});


gulp.task('rules', 'Build and upload rules file to Firebase.', ['rules:build'], function() {

  var firebaseUrl = process.env.FIREBASE_URL,
    firebaseAuthToken = process.env.FIREBASE_AUTH_SECRET;


  return fs.createReadStream('build/rules.json')
  .pipe(https.request({
    hostname: firebaseUrl,
    method: 'PUT',
    path: '/.settings/rules.json?auth=' + firebaseAuthToken,
    headers: {
      'Content-Type': 'application/json'
    },
    agent: false // connection: close
  }, function(res) {
    var responseJSON = '';
    res
    .on('data', function(data) {
      responseJSON += data.toString();
    })
    .on('end', function() {

      var responseError = JSON.parse(responseJSON).error;
      if (res.statusCode !== 200) {
        throw new Error(
          'Upload of security rules to ' +
          firebaseUrl +
          ' failed!\n' +
          'Error: ' +
          responseError
        );
      } else {
        console.log('Rules uploaded OK!');
      }

    });
  }));

});
