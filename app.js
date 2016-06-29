// Module dependencies.
var express = require('express');
var ArticleProvider = require('./articleprovider-memory').ArticleProvider;

var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(require('stylus').middleware({ src: __dirname + '/public' }));


/*app.configure('production', function(){
  app.use(express.errorHandler());
});*/

var articleProvider= new ArticleProvider();

app.get('/', function(req, res){
    articleProvider.findAll( function(error,docs){
        res.render('index.jade', {
            title: 'Blog',
            articles:docs
        });
    })
});

app.get('/blog/new', function(req, res) {
    res.render('blog_new.jade', { locals: {
        title: 'New Post'
        }
    });
});

app.post('/blog/new', function(req, res){
     articleProvider.save({
        title: req.param('title'),
        body: req.param('body')
    }, function( error, docs) {
        res.redirect('/')
    });
});

app.use(express.static(__dirname + '/public'));
app.use(errorHandler({ dumpExceptions: true, showStack: true }));

app.listen(3000);
