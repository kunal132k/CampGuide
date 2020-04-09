var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1559521783-1d1599583485?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "In the above case, the edge 4 - 2 connects 4 to an ancestor of its parent i.e. 3, so it is a Back Edge. And similarly 3 - 1 is also a Back edge. But why bother about Back Edge? Presence of a back edge means presence of an alternative path in case the parent of the vertex is removed. Suppose a vertex  is having a child  such that none of the vertices in the subtree rooted at  have a back edge to any vertex discovered before , that means if vertex  is removed then there will be no path left for vertex  or any of the vertices present in the subtree rooted at vertex v to reach any vertex discovered before , that implies, the subtree rooted at vertex  will get disconnected from the entire graph, and thus the number of components will increase and  will be counted as an articulation point. On the other hand, if the subtree rooted at vertex  has a vertex  that has back edge that connects it to a vertex discovered before , say , then there will be a path for any vertex in subtree rooted at  to reach  even after removal of , and if that is the case with all the children of , then  will not count as an articulation point."
    },
    {
        name: "Desert Mesa",
        image: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor",
        image: "https://images.unsplash.com/photo-1466220549276-aef9ce186540?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "blah blah blah"
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed");

        // //Add a few campgrounds
        // var x=data.length;
        // for(var i=0;i<x;i++) {
        //     Campground.create(data[i], function(err, campground){
        //         if(err){
        //             console.log(err);
        //         }
        //         console.log("added a campground");
        //         //create a comment
        //         Comment.create(
        //             {
        //                 text: "this place is great",
        //                 author: "Homer"
        //             }, function(err, comment){
        //                 if(err){
        //                     console.log(err);
        //                 } else {
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                     console.log("new comment created");
        //                 }
                        
        //             });
        //     });
        // }
    });
}

module.exports = seedDB;

