// ============================================
//              MIDDLEWARE
// ============================================
var Campground = require("../models/campground");
var Comment    = require("../models/comment");

var middlewareObject = {};

middlewareObject.isLoggedIn = function(req, res, next){
    // check if the user is authenticated with the request object
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("/login");
    }
}

middlewareObject.checkCampgroundOwnership = function(req, res, next){
    // check if the user is logged in
    if(req.isAuthenticated()){
        
        // find the campground db object
        Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("back");
       } else {
           // check if the user owns the campground
           if(campground.author.id.equals(req.user._id)){
               next();
           } else {
               req.flash("error", "You can't do that");
               res.redirect("back");
           }
       }
    });
    } else{
        req.flash("error", "Please log in first");
        res.redirect("/login")
    }
}

middlewareObject.checkCommentOwnership = function(req, res, next){
    // check if the user is logged in
    if(req.isAuthenticated()){
        
        // find the campground db object
        Comment.findById(req.params.comment_id, function(err, comment){
       if(err){
           console.log(err);
           res.redirect("back");
       } else {
           // check if the user owns the campground
           if(comment.author.id.equals(req.user._id)){
               next();
           } else {
               req.flash("error", "You can't do that");
               res.redirect("back");
           }
       }
    });
    } else{
        req.flash("error", "Please log in first");
        res.redirect("/login")
    }
}

module.exports = middlewareObject;