require('dotenv').config({ path: './config.env' });
/* only required files */
const express = require("express");
const session = require("express-session");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT;
const cors = require("cors");
const User = require("./Schema/UserSchema.js");
const mailSend = require("./controller/emailController.js");

/* App uses starts from here */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require("./DB/DB.js")
app.use(cors());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}))

/* main routes for backend */
//this is for Registration route
app.post('/register', async (req, res) => {
    const { role, fname, lname, email, pass } = req.body;
    const user = new User({ role, fname, lname, email, pass });
    await user.save();
    res.json({ message: 'User created successfully', user });
})


app.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    // console.log("This is: ", email, pass);
    await User.findOne({ email }).then((user) => {
        if (user.pass === pass) {
            req.session.user = user;

            res.status(201).json({ msg: user });
        } else {
            res.status(401).json({ msg: "Check Your Email and Password!" });
        }
    }).catch((err) => {
        res.json({ msg: "Error" });
    })
})


app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            // Set cache control headers to prevent caching
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
            res.status(201).json({ msg: "Logout successful" });
        }
    });
});


app.post('/sendmail', (req, res) => {
    const { email, subject, message } = req.body;
    let resp = mailSend(email, subject, message);
    res.json({ msg: resp });
})
app.listen((port), (req, res) => {
    console.log(`http://127.0.0.1:${port}`);
})