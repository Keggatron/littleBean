// var express = require("express"),
//     app = express(),
//     bcrypt = require("bcryptjs"),
//     bodyParser = require("body-parser"),
//     mongoose = require("mongoose"),
//     User = require("./app/userModel.js"),
//     nev = require("email-verification")(mongoose);


// // Configuring email-verification
    
// // var myHasher = function(password, tempUserData, insertTempUser, callback) {
// //         var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// //         return insertTempUser(hash, tempUserData, callback);
// //     };


// // nev.configure({
// //     persistentUserModel: User,
// //     expirationTime: 84600,
    
// //      verificationURL: "https://projects-keggatron.c9users.io/register/${URL}",
// //     transportOptions: {
// //         service: "Gmail",
// //         auth:{
// //             user: "keggatron@gmail.com",
// //             pass: "longshlong"
// //         }
// //     },
// //     verifyMailOptions: {
// //         from: "Do Not Reply <littlebean_do_not_reply@gmail.com>",
// //         subject: "Please confirm account",
// //         html: "<p>Click this <a href='${URL}'> link </a> to confirm your account otherwise copy and paste the URL below into your browser:</p>",
// //         text: "Please confirm your account by clicking the following link: ${URL}"
// //     }, function(err, options){
// //         if(err){
// //             console.log(err);
// //         }else{
// //             console.log("success");
// //         }
// //     },
// //     hashingFunction: myHasher,
// //     passwordFieldName: 'pw',
// //     }, function(err,options){
// //         if(err){
// //             console.log(err);
// //             return;
// //         }
// //         console.log('configured: ' + (typeof options === 'object'));
// //     });
    
// //     nev.generateTempUserModel(User, function(err, tempUserModel){
// //             if(err){
// //                 console.log(err);
// //                 return;
// //             }
// //             console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
      
// //     });

// var myHasher = function(password, tempUserData, insertTempUser, callback) {
//             var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//             return insertTempUser(hash, tempUserData, callback);
//         };

// // myHasher = function(password, tempUserData, insertTempUser, callback) {
// //     bcrypt.genSalt(8, function(err, salt) {
// //         bcrypt.hash(password, salt, function(err, hash) {
// //             return insertTempUser(hash, tempUserData, callback);
// //         });
// //     });
// // };




// nev.configure({
//     persistentUserModel: User,
//     expirationTime: 86400,
    
    
//     verificationURL: "https://projects-keggatron.c9users.io/register/${URL}",
//     transportOptions: {
//         service: "Gmail",
//         auth:{
//             user: "keggatron@gmail.com",
//             pass: "longshlong"
//         }
//     },
//     verifyMailOptions: {
//         from: "Do Not Reply <littlebean_do_not_reply@gmail.com>",
//         subject: "Please confirm account",
//         html: "<p>Click the following link to confirm your account:<p><p>${URL}</p>",
//         text: "Please confirm your account by clicking the following linkg: ${URL}"}, 
//     function(err, options){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("success");
//         }
//     },
//     hashingFunction: myHasher,
//     passwordFieldName: 'pw',
// }, function(err,options){
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log('configured: ' + (typeof options === 'object'));
// });
   
// nev.generateTempUserModel(User, function(err,tempUserModel){
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
// });