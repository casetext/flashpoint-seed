
'use strict';

var path = require('path'),
  gulp = require('gulp'),
  http = require('http'),
  express = require('express'),
  socketio = require('socket.io');


gulp.task('watch:indexpage', false, require('./lib/generateIndexPage'));


gulp.task('watch', false, function() {

  var app = express(),
    server = http.Server(app),
    io = socketio(server),
    bundle = require('../bundle.json');

  app.use('/static', express.static(path.resolve(__dirname + '/../build/static')) );
  app.use('/*', function(req, res) {
    return res.sendFile(path.resolve(__dirname + '/../build/index.html'));
  });

  gulp.watch('build/index.html', function() {
    io.emit('reload');
  });
  gulp.watch('build/rules.json', ['rules:upload']);
  gulp.watch('./index.jade', ['watch:indexpage']);
  gulp.watch('src/**/*.*', ['app:regenerate', 'lint']);
  gulp.watch(bundle.js.concat(bundle.css), ['vendor:regenerate']);

  server.listen(3000);
  console.log('Now listening on port 3000');

});
