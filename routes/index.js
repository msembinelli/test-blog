var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

  /* GET login page. */
  router.get('/admin', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('admin.jade', { message: req.flash('message') });
  });

  /* Handle Login POST */
  router.post('/admin', passport.authenticate('login', {
    successRedirect: '/blog/new',
    failureRedirect: '/admin',
    failureFlash : true
  }));

  /* GET Registration Page */
  router.get('/signup', function(req, res){
    res.render('register.jade',{message: req.flash('message')});
  });

  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/blog/new',
    failureRedirect: '/signup',
    failureFlash : true
  }));

  /* GET Home Page */
router.get('/blog/new', isAuthenticated, function(req, res){
  res.render('blog_new.jade', { user: req.user });
});

/* Handle Logout */
router.get('/signout', function(req, res) {
  req.logout();
  res.redirect('/');
});

  return router;
}
