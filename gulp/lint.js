
'use strict';

var gulp = require('gulp'),
  jshint = require('gulp-jshint');

gulp.task('lint:src', false, function() {

  return gulp.src('src/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));

});


gulp.task('lint:test', false, function() {

  return gulp.src('test/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));

});


gulp.task('lint', 'Check the Javascript files for errors.', ['lint:src', 'lint:test']);
