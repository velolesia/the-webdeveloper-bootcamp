var express = require("express"),
  app = express(),
  request = require("request"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  flash = require("connect-flash"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  Comment = require("./models/comment"),
  Camp = require("./models/camp"),
  User = require("./models/user"),
  seedDB = require("./seeds");

var url = process.env.DATABASEURL || "mongodb://localhost/travel_camp";

var campRoutes = require("./routes/camps"),
  commentRoutes = require("./routes/comments"),
  indexRoutes = require("./routes/index");

mongoose.connect(process.env.DATABASEURL);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "Cats are best.",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", indexRoutes);
app.use("/camps", campRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.HOST, function() {
  console.log("Yelp Camp has started.");
});
