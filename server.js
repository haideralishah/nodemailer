/* =====================================================
      Importing Necessory Module & Envoirnment Setting
   ===================================================== */

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var logger = require('morgan');
var path = require('path');
var port = process.env.PORT || '3000';
var cors = require('cors');
var fs = require('fs');
var app = express();
var __dirname = './user_directory/R5/R5_1';
var uploadPath = './user_directory/R5/';
var multer = require('multer');
var fileUpload = require('express-fileupload');
// var firebase = require("firebase");
// var admin = require("firebase-admin");
var nodemailer = require('nodemailer');
// import * as admin from "firebase-admin";

// var config = {
//     apiKey: "AIzaSyA6ozf67ohbTk9EvSr9gFeX4layz6aN7jA",
//     authDomain: "sample-98876.firebaseapp.com",
//     databaseURL: "https://sample-98876.firebaseio.com",
//     storageBucket: "sample-98876.appspot.com",
//     messagingSenderId: "975075020136"
// };
// firebase.initializeApp(config);


// var serviceAccount = require("./firebase-adminsdk.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://sample-98876.firebaseio.com"
// });


/* =====================================================
            Middleware Will Run on Every Request
   ===================================================== */

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use(function (req, res, next) {
//     if (req.headers['x-forwarded-proto'] != 'https')
//         res.redirect('https://immense-depths-75143.herokuapp.com')
//     else
//         next()
// })

app.get('/deleteUser', function (req, res) {
    var uidToDelete = req.headers.uid;
    admin.auth().deleteUser(uidToDelete)
        .then(function () {
            console.log("Successfully deleted user");
            res.end();
        })
        .catch(function (error) {
            console.log("Error deleting user:", error);
            res.end();
        });
    console.log(uidToDelete);

})

app.get('/mailSend', mailSend)

function mailSend(req, res) {
    console.log('haider----------------------------');
    handleSayHello(req, res);

    function handleSayHello(req, res) {
        // Not the movie transporter!
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'haseebrehmanpc@gmail.com', // Your email id
                pass: 'shan1234' // Your password
            }
        });
        var text = 'Hello your reservation confirmed. Your Slot Number is' + req.headers.slotno + ' \n\n' + req.headers.from;
        var mailOptions = {
            from: 'haseebrehmanpc@gmail.com', // sender address
            to: req.headers.recipient, // list of receivers
            subject: 'Reservation Confirmed', // Subject line
            text: text, //, // plaintext body
            // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
            // attachments: [
            //     {
            //         filename: 'voicemail.mp3',
            //         path: 'https://s3.amazonaws.com/recordings_2013/24c5065c-acab-11e6-8176-842b2b4c14d7.mp3'
            //     }
            // ]
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.json({ yo: error });
            } else {
                console.log('Message sent: ' + info.response);
                res.json({ yo: info.response });
            };
        });
    }
}



/* =====================================================
                      Server Listen
   ===================================================== */

app.listen(port, function () {
    console.log("server is listening on port : ", port);
}).timeout = 25000;
