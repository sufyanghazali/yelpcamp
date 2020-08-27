const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");

// INDEX - show all campgrounds
router.get("/", (req, res) => {
    // Get all campgrounds from DB
    Campground.find({}, (err, campgroundArr) => {
        if (err) {
            console.log(err);
        } else {
            // req.uesr is from res.locals in app.js
            res.render("campgrounds/index", {campgrounds: campgroundArr, currentUser: req.user});
        }
    })
});

// CREATE - add new campgrounds
router.post("/", middleware.isLoggedIn, (req, res) => {
    // Get data from form and add to campgrounds array
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const description = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    };

    const newCampground = {
        name: name,
        price: price,
        image: image,
        description: description,
        author: author
    };

    console.log(`HEY HEY HEY, this is the user: ${req.user}`);

    // Create new campground and add to DB
    Campground.create(newCampground, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Created new camground");
            console.log(campground);
            // Redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", (req, res) => {
    // Find campground with provided ID
    const id = req.params.id;

    Campground.findById(id).populate("comments").exec((err, campground) => {
        if (err) {
            console.log(err);
        } else {
            console.log(campground);
            // render show template with that campground
        }
        res.render("campgrounds/show", {campground: campground});
    });
});

// Edit campground route - show the form
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    // check if user is logged in 
    const id = req.params.id;
    Campground.findById(id, (err, campground) => {
        // Can check if there is an error here. flash message and redirect back
        res.render("campgrounds/edit", {campground: campground});
    });
});

// Update campground route
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    const id = req.params.id;
    const campground = req.body.campground;

    Campground.findByIdAndUpdate(id, campground, (err, campground) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect(`/campgrounds/${id}`);
        }
    });
});

// Destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, async (req, res) => {
    try {
        const id = req.params.id;
        let campground = await Campground.findById(id);
        await campground.remove();
        res.redirect("/campgrounds");
    } catch (err) {
        res.redirect("/campgrounds");
    }
});

module.exports = router;


