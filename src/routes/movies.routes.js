// routes/movies.js

const express = require('express');
const moviesController = require('../controllers/movies.controller.js');
const router = express.Router();

router.get('/', moviesController.getMovies);

module.exports = router;
