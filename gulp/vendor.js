
'use strict';

var gulp = require('gulp'),
  del = require('del'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rev = require('gulp-rev'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat');


gulp.task('vendor:clean', false, function() {
  del.sync(['build/static/vendor*', 'build/manifest/vendor*']);
});


gulp.task('vendor:js', false, ['vendor:clean'], function() {

  var bundle = require('../bundle.json');

  return gulp.src(bundle.js)
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(concat({ path: 'vendor.js', cwd: '.' }))
  .pipe(uglify())
  .pipe(rev())
  .pipe(sourcemaps.write('.', { sourceRoot: 'vendor' }))
  .pipe(gulp.dest('build/static'))
  .pipe(rev.manifest({path:'manifest/vendor.js.json'}))
  .pipe(gulp.dest('build'));

});


gulp.task('vendor:css', false, ['vendor:clean'], function() {

  var bundle = require('../bundle.json');

  return gulp.src(bundle.css)
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(concat({ path: 'vendor.css', cwd: '.' }))
  .pipe(rev())
  .pipe(sourcemaps.write('.', { sourceRoot: 'vendor' }))
  .pipe(gulp.dest('build/static'))
  .pipe(rev.manifest({path: 'manifest/vendor.css.json'}))
  .pipe(gulp.dest('build'));

});


gulp.task('vendor', 'Build the vendored assets.', ['vendor:js', 'vendor:css']);


gulp.task('vendor:regenerate', false, ['vendor'], require('./lib/generateIndexPage'));

