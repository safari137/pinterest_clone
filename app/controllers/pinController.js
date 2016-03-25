var Pin     = require('../models/pin'),
    User    = require('../models/user'),
    ObjectId = require('mongoose').Types.ObjectId;
    
var pinController = function() {
    
    this.addPinPage = function(req, res) {
        res.render('addPin', { isAuthenticated : req.isAuthenticated()});
    }
    
    this.addPin = function(req, res) {
        req.body.pin.owner = req.user._id;
        
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
        Pin.find({}).populate("owner").exec(function(err, pins) {
           if (err) { callback(err, null); return; } 
           
           callback(null, pins);
        });
    }
    
    var getPinsByFilter = function(filter, callback) {
        Pin.find(filter).populate("owner").exec(function(err, pins) {
            if (err) { callback(err, null); return; }
            
            callback(null, pins);
        });
    }
    
    this.showUserPins = function(req, res) {
        if (!ObjectId.isValid(req.params.id)) {
            res.send({'error' :  'not a valid user'});
            return;
        }
        
        User.findById(req.params.id).populate("pins").exec(function(err, user) {
            if (err) throw err;
            
            var isOwner = (req.isAuthenticated()) ? (req.user._id.toString() === user._id.toString()) : false;
            
            res.render("user/pins", { isAuthenticated : req.isAuthenticated(), pins : user.pins, username : user.username, isOwner : isOwner });
        });
    }
    
    this.deletePin = function(req, res) {
        Pin.findById(req.params.id, function(err, pin) {
            if (err) {
                res.send({'err' : err});
                return;
            }
            
            if (pin.owner.toString() !== req.user._id.toString()) {
                res.send({'err' : 'Not Authorized'});
                return;
            }
            
            pin.remove();
            res.send({'success' : 'pin removed'});
        });
    }
}

module.exports = pinController;