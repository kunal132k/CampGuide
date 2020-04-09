var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");

//mongoose.connect("mongodb://localhost:27017/yelp_camp",{ useNewUrlParser: true });
mongoose.connect("mongodb://localhost/yelp_camp", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(err);
});

app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");

//schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {   name: "Will Hills",
//         image: "https://i.pinimg.com/236x/f4/d5/89/f4d5892f265ef70a8d2b35b655498e59.jpg",
//         description: "this is a huge hill, beautifull and dangerous"
//     }, function(err, campground){
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     }
// );

app.get("/",function(req, res){
    res.render("landing");
});

app.get("/campgrounds",function(req, res){
    Campground.find({},function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else{
             res.render("index",{campgrounds: allcampgrounds});
        }
    });
});

app.post("/campgrounds",function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var dsc = req.body.description;
    var newcampground = {name: name, image: image, description: dsc};
    Campground.create(newcampground, function(err,newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new",function(req, res){
    res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req,res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err) {
            console.log(err);
        } else{
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3000,function(){
    console.log("YelpCamp server has started");
});