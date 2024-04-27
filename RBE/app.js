require('dotenv').config({ path: './config.env' });
/* only required files */
const express = require("express");
const session = require("express-session");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT;
const cors = require("cors");
const User = require("./Schema/UserSchema.js");
const Empl = require("./Schema/employeeShcema.js");
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
    const userExsits = await User.findOne({ email });
    if (userExsits) {
        res.status(401).json({ msg: "User Already Exists" });
    } else {
        const user = new User({ role, fname, lname, email, pass });
        user.save();
        res.json({ message: 'User created successfully', user });
    }

})


app.post("/login", async (req, res) => {
    const { email, pass } = req.body;
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

app.post("/oneEmplo", async (req, res) => {
    const uId = req.body;
    console.log(`FormId:${uId.formId}`); 
    await Empl.findOne({ _id: uId.formId }).then((oneuData) => { 
        console.log(oneuData)
        res.json({ Oemp: oneuData })  
    }).catch((err) => {
        res.json({ err: err });
    })
})
let needMail;
app.post('/sendmail', (req, res) => {
    let subject = "Test Mail";
    let email = req.body.email;
    let resp = mailSend(email, subject);
    if (resp) {
        needMail = email;
    }
    res.json({ msg: resp });
})


app.post("/newPassword", async (req, res) => {
    const { pass, npass } = req.body;
    console.log(`${pass} ${npass} ${needMail}`);
    await User.findOne({ email: needMail }).then((user) => {
        console.log(`1`);
        if (pass != npass) {
            console.log(`3`);
            res.json({ msg: "Password doesn't Matchiing!" });
        } else {
            console.log(`2`);
            User.updateOne({ email: needMail }, { $set: { pass: npass } }).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            });
        }
    }).catch((err) => {
        res.json({ msg: err });
    })
})

app.post('/EmployeeData', async (req, res) => {
    await Empl.find({}).then((users) => {
        res.json({ msg: users });
    })
})

app.post("/addemp", async (req, res) => {
    const { name, dsgn, depart, tkt, DOJ, DOC } = req.body;
    console.log(name, dsgn, depart, DOJ, DOC);
    let emp = new Empl({ name, dsgn, depart, tkt, DOJ, DOC });
    if (emp) {
        emp.save();
        res.json({ msg: "add Employee" });
    } else {
        res.json({ err: "Error" });
    }
})

app.listen((port), (req, res) => {
    console.log(`http://127.0.0.1:${port}`);
})