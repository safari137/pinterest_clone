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
        
    app.route("/pin")
        .post(isLoggedIn, pinController.addPin);
    
    app.route("/login")
        .get(userController.startLogin)
        .post(userController.login);
        
    app.route("/signup")
        .get(userController.startSignup)
        .post(userController.signup);
}

module.exports = routes;