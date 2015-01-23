
'use strict';

var gulp = require('gulp-help')(require('gulp')),
  fs = require('fs'),
  bower = require('bower'),
  generateIndexPage = require('./gulp/lib/generateIndexPage');

require('./gulp/assets');
require('./gulp/init');
require('./gulp/watch');
require('./gulp/vendor');
require('./gulp/app');
require('./gulp/lint');
require('./gulp/test');
require('./gulp/rules');
require('./gulp/populate');


// create "build" if it doesn't exist
try {
  fs.mkdirSync('build');
} catch(e) {}

gulp.task('indexpage', false, ['app', 'vendor'], generateIndexPage);


gulp.task('bower', false, function() {
  return bower.commands.update();
});


gulp.task('build', 'Build all assets.', ['app', 'assets', 'vendor', 'indexpage']);


gulp.task('build:watch', false, ['build'], function() {
  gulp.start('watch');
});


gulp.task('dev', 'Rebuild and reload the app on changes. Develop away!', ['bower'], function() {

  gulp.start('build:watch');
  gulp.start('test:unit:run');

});


gulp.task('default', false, ['dev']);
