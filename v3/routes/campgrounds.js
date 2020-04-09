var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var methodOverride  = require("method-override");

router.use(methodOverride("_method"));

router.get("/campgrounds",function(req, res){
    Campground.find({},function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else{
             res.render("campgrounds/index",{campgrounds: allcampgrounds, currentUser: req.user});
        }
    });
});

router.post("/campgrounds",isLoggedIn,function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var dsc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newcampground = {name: name, image: image, description: dsc, author: author};
    Campground.create(newcampground, function(err,newlyCreated){
        if(err){
            console.log(err);
        } else {
            //console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});

router.get("/campgrounds/new",isLoggedIn,function(req, res){
    res.render("campgrounds/new",{currentUser: req.user, currentUser: req.user});
});
//SHOW
router.get("/campgrounds/:id", function(req,res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else{
            //console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground , currentUser: req.user});
        }
    });
});
//EDIT
router.get("/campgrounds/:id/edit", function(req,res){
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            res.redirect("/campgrounds");
        } else{
            //console.log(foundCampground);
            res.render("campgrounds/edit",{campground: foundCampground});
        }
    });
});

//UPDATE
router.put("/campgrounds/:id", function(req,res){
    //console.log(req.body.campground);
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else{
            //console.log(updatedCampground);
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;