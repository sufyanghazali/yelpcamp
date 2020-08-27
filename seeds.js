const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
    {
        name: "Yeo Lake",
        image: "https://parkstaybookings.dbca.wa.gov.au/campground-image/146/248/?mediafile=/media/parkstay/campground_images/09d3fd9f-eec.jpg",
        description: "Aenean imperdiet eros nec mauris auctor posuere. Curabitur sollicitudin est diam, eget facilisis nibh molestie eget. In placerat mauris et suscipit sodales. Sed id libero lacus. Maecenas vitae ex turpis. Ut ipsum libero, cursus a ligula sit amet, consequat pretium tortor. Mauris a mi iaculis, aliquam sem eu, aliquam ante. Mauris scelerisque lectus ipsum, sed malesuada magna placerat vitae. Curabitur et sem auctor diam condimentum sodales. Integer dignissim urna ex, facilisis dapibus turpis faucibus in. Nulla mauris orci, feugiat in mollis nec, fermentum vel elit. Mauris ex justo, elementum sit amet pellentesque sed, vestibulum et eros. Sed at tortor quam. Quisque ut arcu et metus tempus tincidunt eu sit amet nunc."
    },
    {
        name: "Lake Mason Homestead",
        image: "https://parkstaybookings.dbca.wa.gov.au/campground-image/146/248/?mediafile=/media/parkstay/campground_images/6aee9610-177.jpg",
        description: "Aenean imperdiet eros nec mauris auctor posuere. Curabitur sollicitudin est diam, eget facilisis nibh molestie eget. In placerat mauris et suscipit sodales. Sed id libero lacus. Maecenas vitae ex turpis. Ut ipsum libero, cursus a ligula sit amet, consequat pretium tortor. Mauris a mi iaculis, aliquam sem eu, aliquam ante. Mauris scelerisque lectus ipsum, sed malesuada magna placerat vitae. Curabitur et sem auctor diam condimentum sodales. Integer dignissim urna ex, facilisis dapibus turpis faucibus in. Nulla mauris orci, feugiat in mollis nec, fermentum vel elit. Mauris ex justo, elementum sit amet pellentesque sed, vestibulum et eros. Sed at tortor quam. Quisque ut arcu et metus tempus tincidunt eu sit amet nunc."
    },
    {
        name: "Karijini",
        image: "https://parkstaybookings.dbca.wa.gov.au/campground-image/146/248/?mediafile=/media/parkstay/campground_images/4e222b66-816.jpg",
        description: "Aenean imperdiet eros nec mauris auctor posuere. Curabitur sollicitudin est diam, eget facilisis nibh molestie eget. In placerat mauris et suscipit sodales. Sed id libero lacus. Maecenas vitae ex turpis. Ut ipsum libero, cursus a ligula sit amet, consequat pretium tortor. Mauris a mi iaculis, aliquam sem eu, aliquam ante. Mauris scelerisque lectus ipsum, sed malesuada magna placerat vitae. Curabitur et sem auctor diam condimentum sodales. Integer dignissim urna ex, facilisis dapibus turpis faucibus in. Nulla mauris orci, feugiat in mollis nec, fermentum vel elit. Mauris ex justo, elementum sit amet pellentesque sed, vestibulum et eros. Sed at tortor quam. Quisque ut arcu et metus tempus tincidunt eu sit amet nunc."
    },
    {
        name: "Goongarried",
        image: "https://parkstaybookings.dbca.wa.gov.au/campground-image/146/248/?mediafile=/media/parkstay/campground_images/11c8247a-ff6.jpg",
        description: "Aenean imperdiet eros nec mauris auctor posuere. Curabitur sollicitudin est diam, eget facilisis nibh molestie eget. In placerat mauris et suscipit sodales. Sed id libero lacus. Maecenas vitae ex turpis. Ut ipsum libero, cursus a ligula sit amet, consequat pretium tortor. Mauris a mi iaculis, aliquam sem eu, aliquam ante. Mauris scelerisque lectus ipsum, sed malesuada magna placerat vitae. Curabitur et sem auctor diam condimentum sodales. Integer dignissim urna ex, facilisis dapibus turpis faucibus in. Nulla mauris orci, feugiat in mollis nec, fermentum vel elit. Mauris ex justo, elementum sit amet pellentesque sed, vestibulum et eros. Sed at tortor quam. Quisque ut arcu et metus tempus tincidunt eu sit amet nunc."
    }
];

function seedDB() {
    // Remove all campgrounds
    Campground.deleteMany({}, (err) => {
        // if (err) {
        //     console.log(err);
        // } else {
        //     console.log("removed campgrounds!");

        //     // add few cmapgrounds
        //     data.forEach(seed => {
        //         Campground.create(seed, (err, campground) => {
        //             if (err) {
        //                 console.log(err);
        //             } else {
        //                 console.log("added a campground");
        //                 // create a comment
        //                 Comment.create({text: "This place is greate, but I wish there was internet", author: "Homer"}, (err, comment) => {
        //                     if (err) {
        //                         console.log(err);
        //                     } else {
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("create new comment");
        //                     }
        //                 });
        //             }
        //         });
        //     });
        // }
    });

    // add a few comments
}

module.exports = seedDB;