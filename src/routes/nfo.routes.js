// routes/nfo.js

const express = require('express');
const nfoController = require('../controllers/nfo.controller.js');
const router = express.Router();
const MOVIES_FOLDER = "H:\\Bad Movies\\Movies";
router.get('/', nfoController.getNfoContents);
router.get('/add', nfoController.addNfo);
//router.get('/import', nfoController.massImport);


module.exports = router;
