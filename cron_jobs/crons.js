const cron = require('node-cron');
const fs = require('fs');

/*The idea behind this file is to add some cron jobs that will replace the need for constant API calls
and provide some stability if for some reason the server code becomes faulty. 

It's also just for crons you stupid idiot

*/


console.log("starting cron jobs")


// function that runs once a day that will scan for folders in a directory and store those folder names into a json file

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
