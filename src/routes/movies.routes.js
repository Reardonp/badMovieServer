// routes/movies.js

const express = require('express');
const moviesController = require('../controllers/movies.controller.js');
const router = express.Router();
console.log("movie.routes.js")


router.get('/', moviesController.getMovies);
router.get('/storedJson', moviesController.getStoredMovieJson);
router.post('/createMovies', moviesController.createMovies);


module.exports = router;
