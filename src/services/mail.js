//const express = require('express');
var nodemailer = require('nodemailer');
const EMAIL = 'xyz@gmail.com';
const PASS = '';

exports.sendmail = (tomail, msg) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASS
        }
    });

    var mailOptions = {
        from: 'xyz@gmail.com',
        to: tomail,
        subject: 'Sending Email using Node.js',
        text: msg
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            return 'Problem in sending email';
        } else {
            console.log('Email sent: ' + info.response);
            return 'Email sent: ' + info.response;
        }
    });

}