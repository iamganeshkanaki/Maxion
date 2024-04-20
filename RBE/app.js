const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 12345;
const cors = require("cors");
const User = require("./Schema/UserSchema.js");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require("./DB/DB.js")


app.use(cors());
app.post('/demo', async (req, res) => {
    const { fname, lname, email, pass } = req.body;
    const user = new User({ fname, lname, email, pass });
    await user.save();
    res.json({ message: 'User created successfully', user });
})


app.listen((PORT), (req, res) => {
    console.log(`http://127.0.0.1:${PORT}`);
})