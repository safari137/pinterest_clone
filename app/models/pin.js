var mongoose = require('mongoose');

var pinSchema = mongoose.Schema({
    ownerId : mongoose.Schema.Types.ObjectId,
    url : String,
    title : String
});

module.exports = mongoose.model("Pin", pinSchema);