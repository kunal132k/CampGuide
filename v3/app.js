    var express     = require("express"),
        app         = express(),
        bodyparser  = require("body-parser"),
        mongoose    = require("mongoose"),
        passport    = require("passport"),
        LocalStrategy   = require("passport-local"),
        Campground  = require("./models/campground"),
        Comment     = require("./models/comment"),
        User        = require("./models/user"),
        methodOverride  = require("method-override"),
        seedDB          = require("./seeds");

var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");

//seedDB();

mongoose.connect("mongodb://localhost/yelp_camp", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(err);
});

app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "ooooooo",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.User;
    next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(3000,function(){
    console.log("YelpCamp server has started");
});