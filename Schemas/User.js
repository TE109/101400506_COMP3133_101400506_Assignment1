const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        "username":{
            type: String,
            index: true
        },
        "email": {
            type: String,
            unique: true
        },
        "password": String, // This should be hashed
        "created_at": Date,
        "updated_at": Date
       }
);

const UserModel = mongoose.model("User",UserSchema);
module.exports = UserModel; 