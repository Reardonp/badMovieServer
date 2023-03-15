const fs = require('fs');
const path = require('path');
const { parseString } = require('xml2js');

//Notes will probably have to use const encodedFolderName = encodeURIComponent(folderName); somepoint my Roulette Wheel reactJs App

function getNfoContents(req, res) {
  // const fakefolder = "Ben & Arthur (2002)"
  const encodedFolderName = encodeURIComponent(req.query.folderName);
  //const folderName = req.query.folderName;
  const folderPath = `H:\\Bad Movies\\Movies\\${decodeURIComponent(encodedFolderName)}`;
  const nfoFilePath = getNfoFilePath(folderPath);
  //console.log(folderName, folderPath, nfoFilePath)
  
  if (!nfoFilePath) {
    return res.status(404).json({ error: 'NFO file not found' });
  }

  fs.readFile(nfoFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read NFO file' });
    }
    const nfoObject = parseNfo(data);
    //console.log("nfoObject " +nfoObject)
    res.json(nfoObject);
  });
}

function getNfoFilePath(folderPath) {
  const files = fs.readdirSync(folderPath);
  //console.log(files)
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = path.extname(file);
    if (ext === '.nfo') {
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

module.exports = { getNfoContents };
