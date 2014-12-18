
'use strict';

var gulp = require('gulp'),
  path = require('path'),
  del = require('del'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rev = require('gulp-rev'),
  sourcemaps = require('gulp-sourcemaps'),
  annotate = require('gulp-ng-annotate'),
  templates = require('gulp-angular-templatecache'),
  jade = require('gulp-jade'),
  less = require('gulp-less'),
  concat = require('gulp-concat');


gulp.task('app:clean', false, function() {
  del.sync(['build/static/app*', 'build/manifest/app*', 'build/templates.js']);
});


gulp.task('app:templates', false, ['app:clean'], function() {

  return gulp.src('src/**/*.jade')
  .pipe(jade())
  .pipe(templates({
    module: 'app',
    base: function(file) {
       var relPath = path.relative(file.base, file.path);
       return path.join(path.dirname(relPath), path.basename(relPath, '.html')) + '.jade';
    }
  }))
  .pipe(gulp.dest('build'));

});


gulp.task('app:js', false, ['app:clean', 'app:templates'], function() {

  return gulp.src(['src/**/*.js', 'build/templates.js'])
  .pipe(sourcemaps.init())
  .pipe(concat({ path: 'app.js', cwd: '.' }))
  .pipe(annotate())
  .pipe(uglify())
  .pipe(rev())
  .pipe(sourcemaps.write('.', { sourceRoot: 'src' }))
  .pipe(gulp.dest('build/static'))
  .pipe(rev.manifest({path: 'manifest/app.js.json'}))
  .pipe(gulp.dest('build'));

});


gulp.task('app:less', false, ['app:clean'], function() {

  return gulp.src('src/**/*.less')
  .pipe(sourcemaps.init())
  .pipe(concat({ path: 'app.less', cwd: '.' }))
  .pipe(less())
  .pipe(rev())
  .pipe(sourcemaps.write('.', { sourceRoot: 'src' }))
  .pipe(gulp.dest('build/static'))
  .pipe(rev.manifest({path: 'manifest/app.less.json'}))
  .pipe(gulp.dest('build'));

});


gulp.task('app', ['app:js', 'app:less', 'app:templates']);


gulp.task('app:regenerate', false, ['app'], require('./lib/generateIndexPage'));
