const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/maxios")
    .then((res) => {
        console.log(`Connected!`)
    }).catch((err) => console.log(`Error:${err}`));