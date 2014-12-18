
'use strict';

var fs = require('fs'),
  gulp = require('gulp'),
  karma = require('karma'),
  mocha = require('gulp-mocha'),
  spawn = require('child_process').spawn;


gulp.task('test:security', 'Run security tests.', ['rules'], function() {

  return gulp.src(['test/security.config.js', 'test/security/**/*.js'])
  .pipe(mocha());

});


gulp.task('test:unit', 'Run unit tests.', function(done) {

  var bundle = JSON.parse(fs.readFileSync('./bundle.json'));
  var files = bundle.js.concat([
    'bower_components/angular-mocks/angular-mocks.js',
    'src/**/*.js',
    'src/**/*.jade',
    'test/unit/setup.js'
  ]);

  if (process.env.ONLY) {
    files.push('test/unit/' + process.env.ONLY + '.js');
  } else {
    files.push('test/unit/**/*.js');
  }

  karma.server.start({
    configFile: __dirname + '/../test/karma.config.js',
    files: files,
    singleRun: true
  }, function(code) {
     done(code);
  });

});


gulp.task('test:unit:run', false, function() {

  karma.server.start({
    configFile: __dirname + '/../test/karma.config.js'
  });

});


gulp.task('test:unit:ci', false, function(done) {

  karma.server.start({
    configFile: __dirname + '/../test/karma.config.js',
    singleRun: true,
    browsers: ['Firefox']
  }, function(code) {
    done(code);
  });

});


gulp.task('test:end-to-end:setup', false, function(done) {

  spawn('./node_modules/.bin/webdriver-manager', ['update'], { stdio: 'inherit' })
  .on('exit', done);

});


gulp.task('test:end-to-end', 'Run end-to-end tests.', ['test:end-to-end:setup', 'watch'], function(done) {

  var opts = ['test/protractor.config.js'];
  if (process.env.ONLY) {
    opts.push('--specs=test/end-to-end/spec/' + process.env.ONLY + '.js');
  }

  spawn('./node_modules/.bin/protractor', opts, { stdio: 'inherit' })
  .on('error', function(e) {
    console.log(e);
  })
  .on('exit', function(code) {

    setTimeout(process.exit, 100);
    done(code);

  });

});


gulp.task('test:end-to-end:ci', false, ['watch'], function(done) {

  spawn('./node_modules/.bin/protractor', ['test/protractor.config.js'], { stdio: 'inherit' })
  .on('error', function(e) {
    console.log(e);
  })
  .on('exit', function(code) {

    setTimeout(process.exit, 100);
    done(code);

  });

});


gulp.task('test', 'Run all tests.', ['test:unit', 'test:security'], function() {
  gulp.start('test:end-to-end');
});
