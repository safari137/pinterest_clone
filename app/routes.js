var express         = require('express'),
    User            = require('./models/user'),
    userController  = require('./controllers/userController'),
    pinController   = require('./controllers/pinController');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}
    
function routes(app, passport) {
    userController = new userController(passport);
    pinController = new pinController();
    
    app.route("/") 
        .get(pinController.showPins);
        
    app.route("/pin/new")
        .get(isLoggedIn, pinController.addPinPage);
        
    app.route("/pin")
        .post(isLoggedIn, pinController.addPin);
        
    app.route("/profile")
        .get(isLoggedIn, userController.showProfile);
    
    app.route("/users/:id")
        .get(pinController.showUserPins);
    
    app.route("/login")
        .get(userController.startLogin)
        .post(userController.login);
        
    app.route("/signup")
        .get(userController.startSignup)
        .post(userController.signup);
        
    app.route("/logout")
        .get(userController.logout);
        
    app.route("/auth/twitter")
        .get(passport.authenticate('twitter'), userController.twitterAuthenticate);
        
    app.route("/auth/twitter/callback")
        .get(passport.authenticate('twitter', { failureRedirect: '/' }), userController.twitterCallback);
        
    app.route("/api/pin/:id")
        .delete(isLoggedIn, pinController.deletePin);
}

module.exports = routes;