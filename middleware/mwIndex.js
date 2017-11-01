var User = require('../app/userModel');



var middlewareObj = {};

middlewareObj.isLoggedIn = function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}

middlewareObj.isAdmin = function isAdmin(req,res,next){
    if(req.isAuthenticated() && req.user.name === "Admin"){
        return next();
    }
    req.flash("error", "You need to be an admin to do that");
    res.redirect("/");
}


module.exports = middlewareObj