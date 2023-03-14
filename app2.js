const express = require("express");
const fs = require("fs");
const path = require("path"); // import the path module
const app = express();

app.get("/", function(req, res){
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
});

app.listen(8888, function(){
    console.log("app listening on port 8888");
});