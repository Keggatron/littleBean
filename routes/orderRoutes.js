var express = require("express"),
    router = express.Router(),
    User = require("../app/userModel"),
    TempUser = require("../app/tempUserModel"),
    mongoose = require("mongoose"),
    nev = require("email-verification")(mongoose),
    bcrypt = require("bcryptjs"),
    Order = require("../app/orderModel"),
    middleware = require("../middleware/mwIndex"),
    passport = require("passport"),
    bodyParser = require("body-parser");
    


router.get("/order", middleware.isLoggedIn, function(req, res){
    User.findById(req.user._id, function(err,foundUser){
                res.render("order", {user: foundUser});
        });
});

router.post("/order", middleware.isLoggedIn, function(req,res){
    // pull in variables for order
    var nameOnOrder = req.body.name,
        address = req.body.address,
        phone = req.body.phone,
        quantity = req.body.quantity,
        orderedBy = {
            id: req.user._id,
            name: req.user.name
        }
        
    var newOrder = {nameOnOrder: nameOnOrder, address: address, phone: phone, quantity: quantity, orderedBy: orderedBy};
    // Create order
    Order.create(newOrder, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
    // find user who's logged in and the order will be linked to
        User.findById(req.user._id, function(err, foundUser){
            if (err) {
                console.log(err);
                req.flash("error", err);
                res.redirect('/order');
            } else {
                foundUser.orders.push(newlyCreated);
                foundUser.save();
                console.log("order saved");
                req.flash("success", "Order created!")
                res.redirect("/user/"+ req.user._id);
            }
        });
    });
});

// Admin page -- complete order
router.put("/order/complete/:id", function(req,res){
    Order.findByIdAndUpdate(req.params.id, {
            orderComplete: true,
            completedDate: Date.now()
        }, function(err){
        if(err){
            console.log(err);
            req.flash("error", err);
            res.redirect("/user/"+ req.user._id);
        }else {
            req.flash("success","Order Completed");
            res.redirect("/user/"+req.user._id);
        }
    });
});

// edit order
router.put("/order/:id", function(req,res){
    Order.findByIdAndUpdate(req.params.id, req.body.order, function(err){
        if(err){
            console.log(err);
            req.flash("error", "Error update could not be saved because " + err);
            res.redirect("/user/"+ req.user._id);
        }else {
            req.flash("success","Order Updated");
            res.redirect("/user/"+ req.user._id);
        }
    });
});



router.delete("/order/:id", function(req,res){
    Order.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            req.flash("error", "Order could not be deleted!")
            res.redirect("/user/" + req.user._id);
        }else {
            req.flash("success","Order deleted!");
            res.redirect("/user/" + req.user._id);
        }
    });
});



module.exports = router;
