var mongoose    = require('mongoose'),
    User        = require("../models/user");

var userController = function(passport) {
    
    this.startLogin = function(req, res) {
        res.render("user/login", { isAuthenticated : req.isAuthenticated(), message: req.flash('loginMessage')} );
    }
    
    this.login = passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login'
    });
    
    this.startSignup = function(req, res) {
        res.render("user/signup", {isAuthenticated : req.isAuthenticated(), message: req.flash('signupMessage') });
    }
    
    this.signup = passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup'
    });
    
    this.logout = function(req, res) {
        req.logout();
        res.redirect("/");
    }
    
    this.twitterAuthenticate = function(req, res) {
        // let passport do the work...
    }
    
    this.twitterCallback = function(req, res) {
        res.redirect("/profile");
    }
    
    this.showProfile = function(req, res) {
        res.redirect("/users/" + req.user._id);
    }
}

module.exports = userController;