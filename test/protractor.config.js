
'use strict';

exports.config = {
  capabilities: {
    browserName: 'chrome'
  },
  framework: 'mocha',
  mochaOpts: {
    slow: 10000,
    timeout: 20000
  },
  suites: {
    full: 'end-to-end/spec/*.js'
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
