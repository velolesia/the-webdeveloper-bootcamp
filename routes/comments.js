var express = require("express");
var router = express.Router();
var Camp = require("../models/camp");
var Comment = require("../models/comment");
const middleware = require("../middleware");

// COMMENTS NEW ROUTE
router.get("/camps/:id/comments/new", middleware.isLoggedIn, function(
  req,
  res
) {
  Camp.findById(req.params.id, function(err, camp) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new.ejs", { camp: camp });
    }
  });
});

// COMMENTS CREATE ROUTE
router.post("/camps/:id/comments", middleware.isLoggedIn, function(req, res) {
  Camp.findById(req.params.id, function(err, camp) {
    if (err) {
      req.flash("error", err);
      res.redirect("/camps");
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //save comment
          comment.save();
          camp.comments.push(comment);
          camp.save();
          req.flash("success", "Successfully added comment");
          res.redirect("/camps/" + camp._id);
        }
      });
    }
  });
});

// EDIT COMMENT ROUTE
router.get(
  "/camps/:id/comments/:comment_id/edit",
  middleware.checkCommentOwnership,
  function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if (err) {
        res.redirect("back");
      } else {
        res.render("comments/edit.ejs", {
          camp_id: req.params.id,
          comment: foundComment
        });
      }
    });
  }
);

// COMMENT UPDATE
router.put("/camps/:id/comments/:comment_id", function(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(
    err,
    updatedComment
  ) {
    if (err) {
      res.redirect("back");
    } else {
      req.flash("success", "Comment successfully updated");
      res.redirect("/camps/" + req.params.id);
    }
  });
});

//COMMENT DESTROY ROUTE
router.delete(
  "/camps/:id/comments/:comment_id",
  middleware.checkCommentOwnership,
  function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
      if (err) {
        res.redirect("back");
      } else {
        req.flash("success", "Comment is deleted");
        res.redirect("/camps/" + req.params.id);
      }
    });
  }
);

module.exports = router;
