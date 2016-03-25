var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: String,
    password: String,
    twitter : {
        id : String,
        token : String,
        username : String,
        displayName : String
    },
    pins : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pin"
        }
    ]
});

userSchema.virtual('username').get(function () {
    return (this.email !== undefined) ? this.email : this.twitter.username; 
});

module.exports = mongoose.model("User", userSchema);