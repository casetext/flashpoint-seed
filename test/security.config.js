
var chai = require('chai'),
  targaryen = require('targaryen');

chai.use(targaryen.chai);

targaryen.setFirebaseRules(require('../build/rules.json'));
targaryen.setFirebaseData(require('../build/populate.json'));

global.users = targaryen.users;
global.expect = chai.expect;
