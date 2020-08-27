const middlewareObj = {};
const path = require("path");
const fs = require("fs");
const Campground = require("../models/campground");
const Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        const id = req.params.id;

        Campground.findById(id, (err, campground) => {
            if (err) {
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                // does user own the campground?
                if (campground.author.id && campground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        const id = req.params.comment_id;

        Comment.findById(id, (err, comment) => {
            if (err) {
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                // does user own the comment?
                if (comment.author.id && comment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
}


middlewareObj.getImages = function (req, res, next) {
    const imageDir = path.join(__dirname, "..", "public", "images");
    let images = [];
    fs.readdir(imageDir, (err, files) => {
        if (err) {
            console.log(`Unable to scan directory: ${err}`);
            res.redirect("/login");
        } else {
            files.forEach((file, i) => {
                images.push(`/images/${file}`);
            });
            req.images = images;
            next();
        }
    });
}

module.exports = middlewareObj;

