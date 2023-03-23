const fs = require("fs");
const path = require("path");
const { markAsUntransferable } = require("worker_threads");
const { parseString } = require("xml2js");
const { readdir } = require("fs").promises;
const { statSync } = require("fs");
const movies = require("./movies.controller");
const glob = require("glob");

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
function convertXMLtoJson(nfoFilePath, res) {
  console.log(nfoFilePath);
  const convertedPath = nfoFilePath.replace(/\//g, "\\");
  console.log(convertedPath);
  fs.readFile(convertedPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read NFO file" });
    }
    const nfoObject = parseNfo(data);
    console.log(nfoObject);
    // return nfoObject
    if (typeof res === "undefined") {
      console.log("res is undefined");
      return nfoObject;
    } else {
      console.log("res is defined");
      return res.json(nfoObject);
    }
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

const MOVIES_FOLDER = "H:\\Bad Movies\\Movies";

async function massImport() {
  glob(MOVIES_FOLDER + "/**/*.nfo", (err, files) => {
    if (err) {
      console.log("Error", err);
    } else {
      // console.log(files)
      convertXMLtoJson(files[0]);
    }
  });
}

module.exports = { getNfoContents, massImport };
