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

function getStoredMovieJson(req, res) {
    console.log('storedJson api hit')
    const filePath = 'H:/Bad Movies/jsonFiles/storedMovieJson.json';
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
        return;
      }
  
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    });
  }
  
module.exports = {
  getMovies,
  getStoredMovieJson,
};
