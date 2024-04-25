const mongoose  = require("mongoose");

const UserSchema = new mongoose.Schema({
    role:{
        type: String,
        required: true
    },
    fname:{
        required: true,
        type: String
    },

    lname:{
        required: true,
        type: String
    },

    email:{
        required: true,
        type: String
    },

    pass:{
        required: true,
        type: String
    }
})


const User = new mongoose.model("members",UserSchema);
module.exports = User;