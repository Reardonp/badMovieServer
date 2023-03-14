// movies.model.js

function getMovies() {
    // logic to retrieve movies from database or file system
    return [
      { title: 'Movie 1', director: 'Director 1' },
      { title: 'Movie 2', director: 'Director 2' },
      // ...
    ];
  }
  
  module.exports = {
    getMovies,
  };
  