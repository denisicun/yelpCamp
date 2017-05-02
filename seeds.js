var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

var campgroundData = [
        {
            name: "Cloud's rest",
            image: "http://camprrm.com/wp-content/uploads/2011/06/whiteface1.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut porta enim, eu tincidunt sem. Nunc vitae dui euismod, luctus orci vitae, semper enim. Donec eu arcu pharetra, sollicitudin nisi ac, congue diam. Nulla facilisi. Integer interdum nunc lectus, maximus lobortis nibh ullamcorper a. Vivamus sodales blandit maximus. Vivamus est nibh, sagittis nec gravida ut, iaculis nec purus. Nulla facilisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent ultricies elit quis consequat tristique. Sed pulvinar tempus congue. Suspendisse auctor metus ac purus volutpat, eu dapibus tortor tempus. Donec id diam finibus, tempor erat quis, ornare eros. Mauris tempus vehicula tristique. Fusce ut dignissim ipsum. Integer sit amet felis dolor. "
        },
        {
            name: "Bobo ville",
            image: "https://www.nps.gov/grsa/planyourvisit/images/web-campground-2015.jpg",
            description: "Donec a ante at lectus sollicitudin vulputate consectetur id ante. Integer viverra suscipit tortor id mollis. Ut tempus efficitur tellus sit amet egestas. Proin gravida nibh in nisi consectetur, non eleifend nulla egestas. Maecenas vitae dui cursus nunc suscipit imperdiet. Sed mollis sit amet ante nec porttitor. Fusce metus lorem, vestibulum id posuere a, lobortis a quam. Nullam cursus ligula nulla, vitae sodales lorem vulputate id. Mauris egestas risus at tempor consectetur. Proin maximus nunc ac orci molestie mattis. In aliquam tellus eu urna euismod interdum. "
        },
        {
            name: "Bamba forest",
            image: "http://www.priestgulch.com/wp-content/uploads/2016/01/Priest-Gulch-Campground.jpg",
            description: "Nullam venenatis leo mi, et bibendum sapien aliquam et. Aenean sit amet est et dui viverra posuere suscipit a ante. Etiam et lacus nisl. Donec consequat, nulla id dignissim congue, magna libero finibus justo, sit amet suscipit arcu tortor sit amet ligula. Nullam aliquam tempus turpis. Maecenas et neque augue. Mauris non dui non leo elementum condimentum. Mauris ut tempor neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse nec mi dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed porttitor tortor vel nunc iaculis, eget hendrerit lectus bibendum. "
        }
    ];

function seedDb(){
    
    // remove all campgrounds
    Campground.remove({}, function(err){
        // if(err){
        //     console.log(err);
        // }
        // else{
            
        //     console.log("Campgrounds deleted :O");
            
        //     // create some new ones from the default data
        //     // only after we have succesfuly deleted all campgrounds, we create new starter data
        //     campgroundData.forEach(function(seed){
        //         Campground.create(seed, function(err, campground){
        //             // if we have any errors than log them
        //             if(err){
        //                 console.log(err);
        //             }
        //             else{
                        
        //                 console.log("Added campground!!!");
                        
        //                 // create some default comments for each campground
        //                 Comment.create({
        //                     text: "I wish I could shower here...",
        //                     author: "Homer"
        //                 }, function(err, comment){
                            
        //                     // if we have an error
        //                     if(err){
        //                         console.log(err);
        //                     }
        //                     else{
                                
        //                         // add the comment to the campground object in the DB
        //                         campground.comments.push(comment);
                                
        //                         // save to the db
        //                         campground.save(function(err){
        //                             if(err){
        //                                 console.log(err);
        //                             }
        //                         });
                                
        //                         // it is about time we add the comment :O
        //                         console.log("New comment added succesfuly!!!");
        //                     }
        //                 });
        //             }
        //         });
        //     });
        // }
    });   
}

module.exports = seedDb;