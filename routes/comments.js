const express = require("express");
// merge params from comments and campgrounds
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const {route} = require("./campgrounds");
const middleware = require("../middleware");

// NEW COMMENT
router.get("/new", middleware.isLoggedIn, (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;

    Campground.findById(id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
});

// CREATE COMMENT
router.post("/", middleware.isLoggedIn, (req, res) => {
    // look up campground using ID
    const id = req.params.id;

    Campground.findById(id, (err, campground) => {
        if (err) {
            req.flash("error", "Something went wrong");

            res.redirect("/campgrounds");
        } else {
            // create new comment
            console.log(req.user);
            const comment = req.body.comment;

            Comment.create(comment, (err, comment) => {
                if (err) {
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    // add username and id to comment
                    // save comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save()
                    campground.comments.push(comment); // connect new comment to campground
                    campground.save();
                    console.log(comment);
                    req.flash("success", "Successfully added comment");
                    res.redirect(`/campgrounds/${id}`); // redirect to show page of target campground
                }
            });
        }
    })

});

// Edit comment
// /campgrounds/:id/comments/:comment_id/edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    const campgroundId = req.params.id; // refers to campground id
    const comment = Comment.findById(req.params.comment_id, (err, comment) => {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("comments/edit", {campgroundId: campgroundId, comment: comment});
        }
    });
})

// Update comment
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    const commentId = req.params.comment_id;
    Comment.findByIdAndUpdate(commentId, req.body.comment, (err, comment) => {
        console.log(`HEY HEY HEY: ${comment}`);
        if (err) {
            res.redirect("back");
        } else {
            // req.params.id comes from app.js when you use the route
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
});

// Destroy comment
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted.")
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
});

module.exports = router;
