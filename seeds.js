var mongoose = require("mongoose");
var Camp = require("./models/camp");
var Comment = require("./models/comment");

var data = [
  {
    name: "Peru",
    image: "https://c2.staticflickr.com/2/1733/42550598361_d599c66628_b.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
  },
  {
    name: "Portugal",
    image: "https://c2.staticflickr.com/2/1751/42550597981_7d90ba4579_b.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
  },
  {
    name: "Puerto Rico",
    image: "https://c2.staticflickr.com/2/1729/42550597261_ea2ef823d9_b.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
  }
];

function seedDB() {
  //Remove all campgrounds
  Camp.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("removed camps!");
    // //add a few campgrounds
    // data.forEach(function(seed) {
    //   Camp.create(seed, function(err, camp) {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.log("added a camp");
    //       //create a comment
    //       Comment.create(
    //         {
    //           text: "This place is great, but I wish there was internet",
    //           author: "Homer"
    //         },
    //         function(err, comment) {
    //           if (err) {
    //             console.log(err);
    //           } else {
    //             camp.comments.push(comment);
    //             camp.save();
    //             console.log("Created new comment");
    //           }
    //         }
    //       );
    //     }
    //   });
    // });
  });
}

module.exports = seedDB;
