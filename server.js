(function () {
  'use strict';

  var port = process.env.PORT || '80';
  var fs = require('fs');
  var path = require('path');
  var colors = require('colors/safe');
  var express = require('express');

  var app = express();

  app.engine('html', require('ejs').renderFile);

  app.use('/', express.static(__dirname + '/views'));
  app.use('/', express.static(__dirname + '/www'));
  app.get('/', function (req, res) {
    res.render('index.html');
  });

  app.listen(port, function () {
    console.log('Server listening on port ' + port + '!');
  });

})();
