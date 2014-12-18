
var fs = require('fs'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  prompt = require('prompt');

gulp.task('init', 'Initialize project', function(done) {

  prompt.start();

  prompt.message = '';
  prompt.delimiter = '';

  prompt.get([{
    name: 'name',
    description: 'Project name:',
    type: 'string',
    required: true
  }, {
    name: 'description',
    description: 'Project description:',
    type: 'string',
    required: true
  }, {
    name: 'author',
    description: 'Project author:',
    type: 'string',
    required: true
  }, {
    name: 'license',
    description: 'Project license:',
    type: 'string',
    default: 'ISC'
  }, {
    name: 'repository',
    description: 'Project repository:',
    type: 'string',
    required: true
  }, {
    name: 'repoType',
    description: 'Repository type:',
    type: 'string',
    default: 'git'
  }, {
    name: 'firebase',
    description: 'Firebase name:',
    type: 'string',
    required: true
  }], function(err, result) {

    if (!err) {

      var bowerConfig = JSON.parse(fs.readFileSync('./bower.json')),
        npmConfig = JSON.parse(fs.readFileSync('./package.json')),
        firebaseConfig = JSON.parse(fs.readFileSync('./firebase.json'));

      bowerConfig.license = result.license;
      bowerConfig.name = result.name;
      bowerConfig.authors = [ result.author ];
      bowerConfig.description = result.description;
      bowerConfig.repository = {
        type: result.repoType,
        url: result.repository
      };

      npmConfig.license = result.license;
      npmConfig.author = result.author;
      npmConfig.private = true;
      npmConfig.name = result.name;
      npmConfig.description = result.description;
      npmConfig.repository = {
        type: result.repoType,
        url: result.repository
      };

      firebaseConfig.firebase = result.firebase;

      fs.writeFileSync('./bower.json', JSON.stringify(bowerConfig, undefined, 2));
      fs.writeFileSync('./package.json', JSON.stringify(npmConfig, undefined, 2));
      fs.writeFileSync('./firebase.json', JSON.stringify(firebaseConfig, undefined, 2));

      gutil.log('All set! To begin developing, type "gulp".');

    }

    if (err && err.message === 'canceled') {
      err = null;
    }

    done(err);

  });

});
