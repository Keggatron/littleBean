var express = require("express"),
    router = express.Router(),
    User = require("../app/userModel"),
    TempUser = require("../app/tempUserModel"),
    mongoose = require("mongoose"),
    nev = require("email-verification")(mongoose),
    bcrypt = require("bcryptjs"),
    passport = require("passport"),
    bodyParser = require("body-parser");
    

var password = process.env.MYGMAILPASSWORD;    
    
    
router.get("/register", function(req,res){
    res.render("register");
});

// Email verification configuration


var myHasher = function(password, tempUserData, insertTempUser, callback) {
    bcrypt.genSalt(8, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            return insertTempUser(hash, tempUserData, callback);
        });
    });
};




nev.configure({
    tempUserModel: TempUser,
    tempUserCollection: 'temp_users',
    persistentUserModel: User,
    persistentUserCollection: 'users',
    expirationTime: 86400,
    
    
    verificationURL: "https://projects-keggatron.c9users.io/register/${URL}",
    transportOptions: {
        service: "Gmail",
        auth:{
            user: "keggatron@gmail.com",
            pass: password
        }
    },
    verifyMailOptions: {
        from: "Do Not Reply <littlebean_do_not_reply@gmail.com>",
        subject: "Please confirm account",
        html: "<p>Please click this <a href='${URL}'>link</a> to confirm your account.</p>",
        text: "Please confirm your account by clicking the following linkg: ${URL}"}, 
    function(err, options){
        if(err){
            console.log(err);
        }else{
            console.log("success");
        }
    },
    hashingFunction: myHasher,
    passwordFieldName: 'password',
}, function(err,options){
    if(err){
        console.log(err);
        return;
    }
    console.log('configured: ' + (typeof options === 'object'));
});
   
nev.generateTempUserModel(TempUser, function(err,tempUserModel){
    if(err){
        console.log(err);
        return;
    }
    console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
}); 

router.post('/register', function(req, res) {
    console.log("post reached")
    // register button was clicked
    if (req.body.type === 'register') {
        var email = req.body.email;
        var pw = req.body.pw;
        var name = req.body.name;
        var newUser = User({
            name: name,
            email: email,
            password: pw
        
        });
       
    
        nev.createTempUser(newUser, function(err, existingPersistentUser, newTempUser) {
            
            if (err) {
                console.log(err);
                return res.status(404).send('ERROR: creating temp user FAILED');
            }

            // user already exists in persistent collection
            if (existingPersistentUser) {
                return res.json({
                    msg: 'You have already signed up and confirmed your account. Did you forget your password?'
                });
            }

            // new user created
            if (newTempUser) {
                var URL = newTempUser[nev.options.URLFieldName];

                nev.sendVerificationEmail(email, URL, function(err, info) {
                    if (err) {
                        return res.status(404).send('ERROR: sending verification email FAILED');
                    }
                    res.json({
                        msg: 'An email has been sent to you. Please check it to verify your account.',
                        info: info
                    });
                });

                // user already exists in temporary collection!
            } else {
                res.json({
                    msg: 'You have already signed up. Please check your email to verify your account.'
                });
            }
        });

        // resend verification button was clicked
    } else {
        nev.resendVerificationEmail(email, function(err, userFound) {
            if (err) {
                return res.status(404).send('ERROR: resending verification email FAILED');
            }
            if (userFound) {
                res.json({
                    msg: 'An email has been sent to you, yet again. Please check it to verify your account.'
                });
            } else {
                res.json({
                    msg: 'Your verification code has expired. Please sign up again.'
                });
            }
        });
    }
});

    
router.get('/register/:URL', function(req, res){
    // res.send("url is " + req.params.URL);
   
    var url = req.params.URL;
    
    
    nev.confirmTempUser(url, function(err, user){
        if (err) {
            console.log(err);
            return res.status(404).send('Error: confirming temp user failed');
        }
        req.flash("success", "Thank you for confirming your account!");
        res.redirect("/login");
    });
    
});



module.exports = router;