const path = require("path");
const fs = require("fs");
const imageDir = path.join(__dirname, "..", "images");
let images = [];

fs.readdir(imageDir, (err, files) => {
    if (err) {
        console.log(`Unable to scan directory: ${err}`);
    } else {
        files.forEach((file, i) => {
            console.log(file);
            images.push(`../images/${file}`);
        });
    }
});


export {images};