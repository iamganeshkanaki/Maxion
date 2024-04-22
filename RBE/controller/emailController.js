const dotenv = require("dotenv").config({ path: "../config.env" });
const nodemailer = require("nodemailer");
const expressAsyncHandler = require("express-async-handler");
const { text } = require("body-parser");
console.log(process.env.SECRET_KEY);

let transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMPT_PASSWORD
    }

});

const mailSend = expressAsyncHandler(async (email, subject) => {
    let mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: subject,
        html: `<p>Click the following link to reset your password:</p><p><a href="http://127.0.0.1:5501/newPassword.html">Reset Password</a></p>`
    };
    transport.sendMail(mailOptions).then((res) => {
        console.log(`Res: ${res}`)
        return res;
    }).catch((err) => {
        console.log(`Err: ${err}`)
        return err;
    })
})

module.exports = mailSend;