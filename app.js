var express = require("express"),
    app = express(),
    bcrypt = require("bcryptjs"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    User = require("./app/userModel"),
    Updates = require("./app/updatesModel"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    flash = require("connect-flash"),
    nev = require("email-verification")(mongoose);

var indexRoutes =  require("./routes/indexRoutes"),
    registerRoutes = require("./routes/registerRoutes"),
    orderRoutes = require("./routes/orderRoutes");
    

mongoose.connect(process.env.LBDATABASEURL,{useMongoClient:true});

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));    
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Beck's is the greatest beeah in tha vorld!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());



// Local strategy setup so that the email field from the users collection is used as the username for the local strategy
passport.use(new LocalStrategy({
    passReqToCallBack: true,
    usernameField: 'email',
    passwordField: 'password'
    },
      function(email, password, done) {
        User.findOne({ email: email }, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect email address.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      }
));


passport.serializeUser(function(user, done){
    done(null, user);
});
passport.deserializeUser(function(user,done){
    done(null,user);
});


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})
    
   
console.log("If this is the first time running the DB you must enter ' db.users.dropIndex('username_1') ' into Mongo!!!!!")


app.use(indexRoutes);
app.use(registerRoutes);
app.use(orderRoutes);
    



app.listen(process.env.PORT, process.env.IP, function(){
    console.log ("The littleBean server has started!");
});




            