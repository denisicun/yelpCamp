var express    = require("express");
var router     = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var middleware = require("../middleware")

// ========================================================= 
//                    campgrounds routes
// =========================================================
// campgrounds main page route
router.get("/", function(req, res){
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        }
        else
        {
            res.render("campgrounds/index", {campgrounds: campgrounds});     
        }
    });
});

// create a new campgroud in the db - post route
router.post("/", middleware.isLoggedIn, function(req, res){
    // get the data from the request
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price: price, image: image, description: description, author: author};
    
    // create the new canpground
    Campground.create(newCampground, 
    function(err, campground){
        if(err){
            console.log(err);
        }
        else
        {
            console.log("New campground added");
            console.log(campground);
        }
    });
    
    // redirect to campgrounds page
    req.flash("success", "New campground created!");
    res.redirect("/campgrounds");
    
});

// create a new campground page - get route
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// show a specific campground route
router.get("/:id", function(req, res){
    
    // find the wanted campground and the comments that it has
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else
        {        
            // send the user to the campground page
            res.render("campgrounds/show", {campground: foundCampground});    
        }
    });
});

// edit campgroud route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    // find the campground from the request, and edit it
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           req.flash("error", "something went wrong");
           res.redirect("/campgrounds");
       } else {
           res.render("campgrounds/update", {campground: campground});
       }
    });
});

// update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            console.log(err);
            req.flash("error", "something went wrong");
            res.redirect("/campgrounds");
        } else{
            req.flash("success", "campground saved");
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
});

// delete campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
            req.flash("success", "campground deleted");
        }
    })
});

module.exports = router;