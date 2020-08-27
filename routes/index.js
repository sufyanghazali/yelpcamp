const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const middlewareObj = require("../middleware");


// ROOT
router.get("/", middlewareObj.getImages, (req, res) => {
    res.render("landing", {images: req.images});
});

// Show sign up form
router.get("/register", (req, res) => {
    res.render("register");
});


// Handle the sign up
router.post("/register", (req, res) => {
    const newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, () => {
                req.flash("success", `Welcome to YelpCamp ${user.username}`);
                res.redirect("/campgrounds");
            });
        }
    });
});

// Show login form
router.get("/login", (req, res) => {
    res.render("login");
});

// Handle login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {
    res.send("Logic");
});


// Logout route
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Yeet!")
    res.redirect("/campgrounds");
});

// Middleware - check if user is logged in
// If yes, move on to the next function
// if not, redirect to login page

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
}

module.exports = router;