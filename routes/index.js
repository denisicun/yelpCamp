var express  = require("express");
var passport = require("passport");
var router   = express.Router({mergeParams: true});
var User     = require("../models/user");

// landing page route
router.get("/", function(req, res){
    res.render("landing");
});

// =========================================================
//                 auth routes
// =========================================================
router.get("/register", function(req, res) {
    res.render("auth/register");
});

router.post("/register", function(req, res) {
    // passport local mongoose register method
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            res.render("auth/register");
            return;
        }
        else
        {
            // authenticate the user with a local strategy    
            passport.authenticate("local")(req, res, function(){
                res.redirect("/campgrounds");
            });
        }
    });
});

// login page route
router.get("/login", function(req, res){
    res.render("auth/login");
});

// login db logic route
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }) ,function(req, res) {

});

// logout logic
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You've logged out");
    res.redirect("/campgrounds");
});

// =========================================================
//                          middelware
// =========================================================
function isLoggedIn(req, res, next){
    // check if the user is authenticated with the request object
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
}

module.exports = router;