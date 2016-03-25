var LocalStrategy   = require('passport-local').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    User            = require('../app/models/user');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Twitter
    
    passport.use('twitter', new TwitterStrategy({

        consumerKey     : process.env.TWITTER_KEY,
        consumerSecret  : process.env.TWITTER_SECRET,
        callbackURL     : 'https://pinterest-clone-safari137.c9users.io/auth/twitter/callback'

    },
    function(token, tokenSecret, profile, done) {
        process.nextTick(function() {

            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

                if (err)
                    return done(err);

                if (user) {
                    return done(null, user); 
                } else {
                    // if there is no user, create them
                    var newUser                 = new User();

                    // set all of the user data that we need
                    newUser.twitter.id          = profile.id;
                    newUser.twitter.token       = token;
                    newUser.twitter.username    = profile.username;
                    newUser.twitter.displayName = profile.displayName;

                    // save our user into the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));




    // SIGN UP
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
        process.nextTick(function() {
            User.findOne({ 'email' :  email }, function(err, user) {
                if (err)
                    return done(err);
    
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } 
                User.create({email: email, password: password}, function(err, newuser) {
                    if (err) throw err;
                    
                    newuser.save(function(err) {
                        if (err) throw err;
                        
                        return done(null, newuser);
                    });
                });
            });    
        });
    }));
    
    
    // LOGIN
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) { 
        User.findOne({ 'email' :  email }, function(err, user) {
            if (err) return done(err, null, req.flash('loginMessage', 'Encountered an error'));

            if (!user)
                return done(null, false, req.flash('loginMessage', 'Incorrect Email or Password')); 

            if (user.password !== password)
                return done(null, false, req.flash('loginMessage', 'Incorrect Email or Password')); 
            
            return done(null, user);
        });
    }));
};