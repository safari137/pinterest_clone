var Pin     = require('../models/pin');
    
var pinController = function() {
    
    this.addPinPage = function(req, res) {
        res.render('addPin', { isAuthenticated : req.isAuthenticated()});
    }
    
    this.addPin = function(req, res) {
        Pin.create(req.body.pin, function(err, pin) {
           if (err) throw err;
           
           req.user.pins.push(pin);
           req.user.save();
        });
        res.redirect('/');
    }
    
    this.showPins = function(req, res) {
        getAllPins(function(err, pins) {
           if (err) throw err;
           
           res.render('index', { isAuthenticated : req.isAuthenticated(), pins : pins});
        });
    }
    
    
    var getAllPins = function(callback) {
        Pin.find({}, function(err, pins) {
           if (err) { callback(err, null); return; } 
           
           callback(null, pins);
        });
    }
}