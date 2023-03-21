const fs = require("fs");
const path = require("path");
const { markAsUntransferable } = require("worker_threads");
const { parseString } = require("xml2js");
const { readdir } = require("fs").promises;
const { statSync } = require("fs");
const movies = require("./movies.controller");
const nfoSchema = require('../models/nfo.model');
const { stringify } = require("querystring");

//Notes will probably have to use const encodedFolderName = encodeURIComponent(folderName); somepoint my Roulette Wheel reactJs App

function getNfoContents(req, res) {
  // const fakefolder = "Ben & Arthur (2002)"
  const encodedFolderName = encodeURIComponent(req.query.folderName);
  //const folderName = req.query.folderName;
  const folderPath = `H:\\Bad Movies\\Movies\\${decodeURIComponent(
    encodedFolderName
  )}`;
  const nfoFilePath = getNfoFilePath(folderPath);
  //console.log(folderName, folderPath, nfoFilePath)

  if (!nfoFilePath) {
    return res.status(404).json({ error: "NFO file not found" });
  }

  convertXMLtoJson(nfoFilePath, res);
}

/*
issues getting the jsonobject to go into the right fields
*/


function addNfo(req, res){
  tempObject= {
    "movie": {
      "title": ["The Matrix"],
      "originaltitle": ["The Matrix"],
      "sorttitle": ["Matrix, The"],
      "epbookmark": ["0"],
      "year": ["1999"],
      "ratings": [{
        "rating": [{
          "default": true,
          "max": 10,
          "name": "IMDb",
          "value": [8.7],
          "votes": [1349194]
        }]
      }],
      "userrating": [8.7],
      "top250": [17],
      "set": ["The Matrix Collection"],
      "plot": ["A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."],
      "outline": ["A computer programmer is recruited by a rebel group to fight against a powerful artificial intelligence system that has enslaved humanity."],
      "tagline": ["Welcome to the Real World."],
      "runtime": ["136"],
      "thumb": [{
        "_": "http://example.com/thumbs/the_matrix.jpg",
        "aspect": "poster"
      }],
      "fanart": [{
        "thumb": ["http://example.com/fanart/the_matrix1.jpg", "http://example.com/fanart/the_matrix2.jpg"]
      }],
      "mpaa": ["R"],
      "certification": ["USA:R"],
      "id": ["tt0133093"],
      "tmdbid": ["603"],
      "uniqueid": [{
        "_": "tt0133093",
        "default": true,
        "type": "imdb"
      }],
      "country": ["USA"],
      "status": ["Continuing"],
      "code": ["12ABC3456"],
      "premiered": ["1999-03-31"],
      "watched": [true],
      "playcount": [3],
      "lastplayed": ["2022-01-01"],
      "genre": ["Action", "Sci-Fi"],
      "studio": ["Warner Bros."],
      "credits": [{
        "_": "The Wachowski Brothers",
        "tmdbid": "1225"
      }],
      "director": [{
        "_": "The Wachowski Brothers",
        "tmdbid": "1225"
      }],
      "tag": ["cyberpunk"],
      "actor": [{
        "name": ["Keanu Reeves"],
        "role": ["Neo"],
        "thumb": ["http://example.com/thumbs/keanu_reeves.jpg"],
        "profile": ["http://example.com/profiles/keanu_reeves.jpg"],
        "tmdbid": ["6384"]
      }, {
        "name": ["Carrie-Anne Moss"],
        "role": ["Trinity"],
        "thumb": ["http://example.com/thumbs/carrie-anne_moss.jpg"],
        "profile": ["http://example.com/profiles/carrie-anne_moss.jpg"],
        "tmdbid": ["2231"]
      }, {
        "name": ["Laurence Fishburne"],
        "role": ["Morpheus"],
        "thumb": ["http://example.com/thumbs/laurence_fishburne.jpg"],
        "profile": ["http://example.com/profiles/laurence_fishburne.jpg"],
        "tmdbid": ["194"]
      }]
    }
  }
  const nfo = new nfoSchema({
    ...req
  });
  // console.log(nfo)
  nfo.save()
  .then((result) => {
    // res.send(result)
  })
  .catch((err)=> {
    console.log(err);
  })
}


/*I need to put in some error handling. 
Need to either rewrite or work on this so i can handle a .nfo file and also a file path. Switch case maybe?
it currenly works for wheelspin only.
Crashes if using /nfo/import api end
res.json(nfoObject) is undefined

update:This seems to be returning the right set of data now. This feels ultimate jank but its working

to do next time
-pass in each file in a loop and try to create DB create functions
im way out of my element right now

*/
function convertXMLtoJson(nfoFilePath) {
  console.log(nfoFilePath)
  return new Promise((resolve, reject) => {
    const convertedPath = nfoFilePath.replace(/\//g, "\\");
    fs.readFile(convertedPath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        reject("Failed to read NFO file");
      }
      const nfoObject = parseNfo(data);
      console.log(nfoObject)
      resolve(nfoObject);
    });
  });
}

function getNfoFilePath(folderPath) {
  const files = fs.readdirSync(folderPath);
  //console.log(files)
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = path.extname(file);
    if (ext === ".nfo") {
      //console.log("folderPath " + folderPath, "file " +file)
      return path.join(folderPath, file);
    }
  }
  return null;
}

function isXML(obj) {
  try {
    xml2js.parseString(obj, function (err, result) {
      if (err) throw new Error();
    });
    return true;
  } catch (err) {
    return false;
  }
}

function isJSON(obj) {
  try {
    JSON.parse(obj);
    return true;
  } catch (err) {
    return false;
  }
}

function parseNfo(nfoString) {
  let nfoObject = {};
  parseString(nfoString, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    nfoObject = result;
  });
  return nfoObject;
}




module.exports = { getNfoContents, convertXMLtoJson, addNfo };
