var Comment = require("../models/comment");
var Camp = require("../models/camp");

const middlewareObj = {
  isLoggedIn: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
  },

  checkCommentOwnership: function(req, res, next) {
    //if user is logged in
    if (req.isAuthenticated()) {
      Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
          res.render("/camps");
        } else {
          if (foundComment.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash("error", "You do not have permissions");
            res.redirect("back");
          }
        }
      });
    } else {
      req.flash("error", "You need to be logged in");
      res.redirect("back");
    }
  },

  checkCampOwnership: function(req, res, next) {
    //if user is logged in
    if (req.isAuthenticated()) {
      Camp.findById(req.params.id, function(err, foundCamp) {
        if (err) {
          res.render("/camps");
        } else {
          if (foundCamp.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash("error", "You do not have permissions");
            res.redirect("back");
          }
        }
      });
    } else {
      req.flash("error", "You need to be logged in");
      res.redirect("back");
    }
  }
};

module.exports = middlewareObj;
