var express = require("express");
var router = express.Router();
var Camp = require("../models/camp");
var Comment = require("../models/comment");
const middleware = require("../middleware");

//IDEX - show all camps

// SHOW ALL CAMPS
router.get("/", function(req, res) {
  // Get all camps from DB
  Camp.find({}, function(err, allCamps) {
    if (err) {
      console.log(err);
    } else {
      res.render("camps/index", { camps: allCamps });
    }
  });
});

// CREATE A NEW CAMP ROUTE
router.post("/", middleware.isLoggedIn, function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCamp = { name: name, image: image, description: desc, author: author };

  Camp.create(newCamp, function(err, newAddedCamp) {
    if (err) {
      console.log(err);
    } else {
      console.log(newAddedCamp);
      res.redirect("/camps");
    }
  });
});

// NEW - show form to create a new camp
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("camps/new.ejs");
});

// SHOW more info about camp
router.get("/:id", function(req, res) {
  Camp.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundCamp) {
      if (err) {
        console.log(err);
      } else {
        res.render("camps/show", { camp: foundCamp });
      }
    });
});

// EDIT camp ROUTE
router.get("/:id/edit", middleware.checkCampOwnership, function(req, res) {
  Camp.findById(req.params.id, function(err, foundCamp) {
    res.render("camps/edit", { camp: foundCamp });
  });
});

// UPDATE CAMP
router.put("/:id", middleware.checkCampOwnership, function(req, res) {
  Camp.findByIdAndUpdate(req.params.id, req.body.camp, function(
    err,
    updatedCamp
  ) {
    if (err) {
      res.redirect("/camps");
    } else {
      res.redirect("/camps/" + req.params.id);
    }
  });
});

// DESTROY CAMP ROUTE
router.delete("/:id", middleware.checkCampOwnership, function(req, res) {
  Camp.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/camps");
    } else {
      res.redirect("/camps");
    }
  });
});

module.exports = router;
