//'use strict';

var express = require('express');
var app = express();
app.get('/', function(req, res) {
  // res.send('New Bee');
  console.log(process.cwd());
  res.sendFile(process.cwd() + '/index.html');
});

app.listen(3000, function() {
  console.log('Listening on port 3000...');
});
