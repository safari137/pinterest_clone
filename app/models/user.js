var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: String,
    password: String,
    pins : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pin"
        }
    ]
});

module.exports = mongoose.model("User", userSchema);