// app.js

const express = require('express');
const moviesRouter = require('./src/routes/movies.routes');
const nfoRouter = require('./src/routes/nfo.routes');
const corsMiddleware = require('./src/middleware/cors');
const app = express();
const cronJobs = require ('./cron_jobs/crons');
const mongoose = require('mongoose');
const connectDB = require('./src/middleware/dbConn')
const Nfo = require('./src/models/nfo.model');
// const { addNfo } = require('./src/controllers/nfo.controller');


app.use(corsMiddleware);
app.use('/movies', moviesRouter);
app.use('/nfo', nfoRouter);
// app.use('/add-nfo', nfoRouter);

cronJobs.dailyMovieJsonFileUpdater();

connectDB();


mongoose.connection.once('open', ()=> {
  console.log('connnected to mongo DB');
  app.listen(8888, function () {
    console.log('app listening on port 8888');
  });
});

