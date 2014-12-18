
'use strict';

var gulp = require('gulp'),
  jade = require('gulp-jade'),
  getManifest = require('./getManifest');


function generateIndexPage() {

  var manifest = getManifest();

  return gulp.src('index.jade')
  .pipe(jade({
    locals: {
      manifest: function(name) {
        return manifest[name] || name;
      },
      now: new Date(),
      env: process.env,
      pkg: require('../../package.json')
    }
  }))
  .pipe(gulp.dest('build'));

}

module.exports = generateIndexPage;
