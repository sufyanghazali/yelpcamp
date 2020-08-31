const express = require('express'),
    app = express(),
    PORT = 3000,
    bodyParser = require("body-parser"), // parses incoming req bodies available under req.body
    flash = require("connect-flash"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user");

// Requiring routes
const commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

// Connect to database
mongoose.connect("mongodb+srv://sufyan:mongodb123@cluster0.bpyr4.mongodb.net/yelp_camp?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to DB!");
}).catch(err => {
    console.log(`ERROR: ${err}`);
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); // lets you use ejs files from views
app.use(express.static(__dirname + "/public")); // for public directory
app.use(methodOverride("_method"));
app.use(flash());


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Hello world",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user; // Passing req.user to every single template
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// Use routes
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(PORT, () => {
    console.log("Server started");
});