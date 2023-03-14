// movies.controller.js
const fs = require("fs");
const path = require("path"); // import the path module

const moviesModel = require('../models/movies.model');
function getMovies(req, res) {
    console.log("hello from movies.controller.js")
    const directoryPath = "H:\\Bad Movies\\Movies"; // set the directory path to the current directory
    const response = { movies: [] }; // modify the response object to have a "movies" property
    fs.readdir(directoryPath, function(err, files){
        if (err) {
            return console.log("Unable to scan directory: " + err);
        }
        files.forEach(function(file){
            const folderName = file.replace(/\s/g, " ");
            const filePath = path.join(directoryPath, file);
            if (file !== ".deletedByTMM" && fs.statSync(filePath).isDirectory()) {
                response.movies.push(folderName); // modify the "folders" property to "movies"
            }
        });
        res.json(response);
    });
}

module.exports = {
  getMovies,
};
