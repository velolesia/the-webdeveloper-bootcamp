var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res) {
  res.render("landing");
});

// SHOW SIGN UP FORM
router.get("/register", function(req, res) {
  res.render("register");
});

// SIGNING UP ROUTE
router.post("/register", function(req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function() {
      req.flash("success", "Welcome to TravelCamp");
      res.redirect("/camps");
    });
  });
});

// SHOW LOGIN PAGE
router.get("/login", function(req, res) {
  res.render("login");
});

// LOGIN ROUTE
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/camps",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);

// LOGOUT ROUTE
router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/camps");
});

module.exports = router;
