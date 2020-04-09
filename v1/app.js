var express = require("express");
var app = express();
var bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");

var campgrounds = [
    {name: "abc",image: "https://i.pinimg.com/236x/43/8f/b1/438fb15ff68343a91d9c9240bca7bd95.jpg"},
    {name: "xyz",image: "https://i.pinimg.com/236x/f9/ad/dd/f9addd6c55940a0328d64438ba8ec7e7.jpg"},
    {name: "pqr",image: "https://i.pinimg.com/236x/f4/d5/89/f4d5892f265ef70a8d2b35b655498e59.jpg"},
    {name: "abc",image: "https://i.pinimg.com/236x/43/8f/b1/438fb15ff68343a91d9c9240bca7bd95.jpg"},
    {name: "xyz",image: "https://i.pinimg.com/236x/f9/ad/dd/f9addd6c55940a0328d64438ba8ec7e7.jpg"},
    {name: "pqr",image: "https://i.pinimg.com/236x/f4/d5/89/f4d5892f265ef70a8d2b35b655498e59.jpg"}
];

app.get("/",function(req, res){
    res.render("landing");
});

app.get("/campgrounds",function(req, res){
    
    res.render("campgrounds",{campgrounds: campgrounds});
});

app.post("/campgrounds",function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newcampground = {name: name, image: image};
    campgrounds.push(newcampground);
    res.redirect("/campgrounds")
});

app.get("/campgrounds/new",function(req, res){
    res.render("new.ejs");
});

app.listen(3000,function(){
    console.log("YelpCamp server has started");
});