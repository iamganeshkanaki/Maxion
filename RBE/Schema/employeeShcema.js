const mongoose = require("mongoose");

const Employee = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dsgn: {
        required: true,
        type: String
    },

    depart: {
        required: true,
        type: String
    },
    tkt: {
        required: true,
        type: String
    },

    DOJ: {
        required: true,
        type: String
    },

    DOC: {
        required: true,
        type: String
    }
})


const Empl = new mongoose.model("emplyoee", Employee);
module.exports = Empl;