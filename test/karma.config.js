
var bundle = require('../bundle.json');

module.exports = function(config) {
  config.set({
    basePath: '..',
    browsers: ['Chrome'],
    files: bundle.js.concat([
      'bower_components/angular-mocks/angular-mocks.js',
      'src/**/*.js',
      'src/**/*.jade',
      'test/unit/setup.js',
      'test/unit/**/*.js'
    ]),
    preprocessors: {
      'test/unit/**/*.js': ['env'],
      'src/**/*.jade': ['ng-jade2js']
    },
    ngJade2JsPreprocessor: {
      moduleName: 'app'
    },
    reporters: ['mocha'],
    mochaReporter: {
      output: 'autowatch'
    },
    plugins: [
      'karma-*',
      require('./karma-ng-jade2js-preprocessor')
    ],
    frameworks: ['mocha', 'chai-sinon'],
    logLevel: config.LOG_WARN,
    client: {
      mocha: {
        slow: 1000,
        timeout: 4000,
        globals: ['angular', 'mock', 'inject']
      }
    }
  });
};
