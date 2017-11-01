var express = require("express"),
    router = express.Router(),
    User = require("../app/userModel"),
    Updates = require("../app/updatesModel"),
    mongoose = require("mongoose"),
    middleware = require("../middleware/mwIndex"),
    passport = require("passport");
    


router.get("/", function(req, res){
    // Updates.findOne({}, function(err, foundUpdate){
    Updates.find({}).sort({$natural: -1}).limit(1).exec(function(err, foundUpdate){
        if(err){
            console.log(err);
        } else {
            return res.render("landing", {update: foundUpdate[0]});
        }
    });
});    

// CREATE NEW UPDATE
router.post("/", middleware.isAdmin, function(req, res){
    var updateTitle = req.body.updateTitle,
        updateImage = req.body.updateImage,
        updateBody  = req.body.updateBody;
    var newUpdate = {updateTitle: updateTitle, updateImage: updateImage, updateBody: updateBody };
    
    Updates.create(newUpdate, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});


router.get("/login", function(req,res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    
    failureRedirect:'/login',
    failureFlash: true
}), 
    
    function(req,res){
        req.flash("success", "You are now logged in!")
        return res.redirect('/user/' + req.user.id);
});
 
// Show user page with all orders
router.get("/user/:id", middleware.isLoggedIn, function(req,res){
   if(req.user.name === "Admin"){
        User.find().populate("orders").exec(function(err,foundUser){
            if(err){
                console.log(err);
            } else { 
                
                return res.render("user", {user: foundUser});
            }
        });
        // populate all orders on users page
    } else if(req.user._id === req.params.id ){
        User.findById(req.user._id).populate("orders").exec(function(err,foundUser){
            if(err){
                console.log(err);
            } else { 
                res.render("user", {user: [foundUser]});
            }
        });
    }
    // redirect to logged in users page
    else {
        res.redirect("/user/" + req.user._id);
    }
    req.params.id;
});


router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Successfully logged you out!");
    res.redirect("/login");
});

module.exports = router;

