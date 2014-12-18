
'use strict';

var fs = require('fs');

function getManifest() {

  var manifest = {};
  try {

    var files = fs.readdirSync('build/manifest');
    files.forEach(function(file) {
      var manifestData = JSON.parse(fs.readFileSync('build/manifest/' + file));

      for (var key in manifestData) {
        manifest[key] = manifestData[key];
      }

    });

    return manifest;

  } catch(e) {
    return {};
  }

}

module.exports = getManifest;
