var express    = require("express");
var router     = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middleware = require("../middleware");

// ========================================================= 
//                    comments routes 
// =========================================================

// get the new comment page route
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find the campground by id and send to the comment page
    Campground.findById(req.params.id, function(err, campground){
        
        // if we have an error 
        if(err){
            console.log(err);
        }
        else
        {
            // send the user the new comment page
            res.render("comments/new", {campground: campground});            
        }
    });
});

// add the new comment to the campground
router.post("/", middleware.isLoggedIn, function(req, res){
    // find the campground
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            // create a new comment in the db
            Comment.create(req.body.comment, function(err, newComment){
                if(err){
                    console.log(err);
                }
                else{
                    // add the user to the comment and save
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    
                    // add the comment to the campground object
                    campground.comments.push(newComment);
                    
                    // saves the object in the db
                    campground.save(); 
                    
                    // redirects to the original campground page
                    req.flash("success", "new comment added");
                    res.redirect("/campgrounds/" + campground._id + "/");
                }
            })
        }
    })
});

// edit comment route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      // if the comment was not ofund, we go back
      if(err){
          res.redirect("back");
      }  else{
          res.render("comments/edit", {comment: foundComment, campgroundId: req.params.id});
      }
    })
});

// update comment route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            res.redirect("back");
        } else{
            req.flash("success", "commet saved");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});
// delete comment route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("/campgrounds/" + req.params.id);
        } else {
            req.flash("success", "comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;