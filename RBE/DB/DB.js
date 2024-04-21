const mongoose = require("mongoose");

mongoose.connect(process.env.url)
    .then((res) => {
        console.log(`Connected!`)
    }).catch((err) => console.log(`Error:${err}`));