var mongoose = require('mongoose');

var pinSchema = mongoose.Schema({
    owner : { 
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    url : String,
    title : String
});

module.exports = mongoose.model("Pin", pinSchema);