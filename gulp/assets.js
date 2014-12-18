
'use strict';

var gulp = require('gulp');

gulp.task('assets', 'Copy everything from assets/ into build/static/assets.', function() {

  return gulp.src('assets/**')
  .pipe(gulp.dest('build/static/assets'));

});
