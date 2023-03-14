// routes/nfo.js

const express = require('express');
const nfoController = require('../controllers/nfo.controller.js');
const router = express.Router();

router.get('/', nfoController.getNfoContents);

module.exports = router;
