// Module dependencies.
var express = require('express');
var ArticleProvider = require('./articleprovider-memory').ArticleProvider;

var app = express();
var bodyParser = require('body-parser')

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(express.methodOverride());
app.use(require('stylus').middleware({ src: __dirname + '/public' }));
app.use(app.router);
app.use(express.static(__dirname + '/public'));

app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

/*app.configure('production', function(){
  app.use(express.errorHandler());
});*/

var articleProvider= new ArticleProvider();

app.get('/', function(req, res){
  articleProvider.findAll(function(error, docs){
      res.send(docs);
  });
})

app.listen(3000);