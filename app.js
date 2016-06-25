// Module dependencies.
var express = require('express');

var app = express();

// Configuration
//app.configure( function() {
//});

// Routes
app.get('/', function(req, res) {
    res.send('Hello World');
});

app.listen(3000);
