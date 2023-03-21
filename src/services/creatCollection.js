var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,collectionName, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection(collectionName, function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});