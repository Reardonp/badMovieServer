const cron = require('node-cron');
const fs = require('fs');

console.log("starting cron jobs")

function dailyMovieJsonFileUpdater (){
    cron.schedule('0 0 * * *', () => {
    const directoryPath = 'H:\\Bad Movies\\Movies';
    const outputFilePath = 'H:\\Bad Movies\\jsonFiles\\storedMovieJson.json';

    fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
        if (err) {
          console.error(err);
          return;
        }
    
        // Filter out only the directories
        const directories = files.filter(file => file.isDirectory()).map(directory => directory.name);
    
        // Write the directory names to a JSON file
        const data = JSON.stringify(directories);
        fs.writeFile(outputFilePath, data, err => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(`Successfully wrote directory names to ${outputFilePath}`);
        });
      });
    
  // Your code goes here
  console.log('Running a task once a day at midnight');
});
}

module.exports = {
dailyMovieJsonFileUpdater,
}
