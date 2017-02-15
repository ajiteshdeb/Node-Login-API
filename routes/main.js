module.exports = function(app,router,passport){

	router.get('/', function(req,res){
		res.render('index');
	});


	app.get('/api/auth/google', passport.authenticate('google', { scope : [ 'profile',
      'email' ] }));

    // the callback after google has authenticated the user
    app.get('/api/auth/google/oauth2callback',
            passport.authenticate('google', {
                    successRedirect : '/api/profile',
                    failureRedirect : '/api'
    }));


    // route for showing the profile page
    app.get('/api/profile' , isLoggedIn, function(req,res){
		res.render('profile', {user:req.user}); // get the user out of session and pass to template
 	});



 	 // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('back');
    });



	// route middleware function to make sure a user is logged in
	function isLoggedIn(req, res, next) {

	    // if user is authenticated in the session, carry on
	    if (req.isAuthenticated())
	        return next();

	    // if they aren't redirect them to the home page
	    res.redirect('/api');
	}
	

	// custom 404 page
	router.use(function(req,res){
		res.status(404);
		res.render("404");
	})

	// apply the routes to our application
	// all of our routes will be prefixed with /api
	app.use('/api',router);


}