// require packeges and modles
var express          = require("express");
var app              = express();
var bodyParser       = require("body-parser");
var mongoose         = require("mongoose");
var Campground       = require("./models/campground");
var Comment          = require("./models/comment");
var seedDb           = require("./seeds");
var passport         = require("passport");
var localStrategy    = require("passport-local");
var User             = require("./models/user");
var campgroundRoutes = require("./routes/campgrounds");
var commentsRoutes   = require("./routes/comments");
var otherRoutes      = require("./routes/index");
var methodOverride   = require("method-override");
var flash            = require("connect-flash");

// set parameters for mongoose and ejs and express
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// magic in the DB
// seedDb();

// passport congif
app.use(require("express-session")({
    secret: "Hey baby hey baby",
    resave: false,
    saveUninitialized: false
})); // creates a secret in the user session

app.use(passport.initialize()); // init passport
app.use(passport.session()); // create a passport session
passport.use(new localStrategy(User.authenticate())); // sets the User model as the authentication strategy
passport.serializeUser(User.serializeUser()); // makes the data in user secret 
passport.deserializeUser(User.deserializeUser()); // understands the usert data any way

// our own use off the app var
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
});

// =========================================================
//                      main routes
// =========================================================
app.use(otherRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comment", commentsRoutes);

// =========================================================
//                       listener
// =========================================================
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("We are up!");
});