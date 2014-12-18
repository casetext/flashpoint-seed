
'use strict';

exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  multiCapabilities: [{
    browserName: 'firefox',
    version: 28
  }, {
    browserName: 'internet explorer',
    version: 9
  }, {
    browserName: 'safari',
    version: 7
  }],
  framework: 'mocha',
  suites: {
    full: 'end-to-end/spec/*.js'
  },
  mochaOpts: {
    slow: 10000,
    timeout: 20000
  },
  rootElement: 'html',
  onPrepare: function() {

    var chai = require('chai');
    chai.use(require('chai-as-promised'));

    var Firebase = require('firebase'),
      Fireproof = require('fireproof');

    Fireproof.bless(require('q'));

    global.expect = chai.expect;
    global.root = new Fireproof(new Firebase(process.env.FIREBASE_URL));

    return global.root.authWithCustomToken(process.env.FIREBASE_AUTH_SECRET);

  }

};
