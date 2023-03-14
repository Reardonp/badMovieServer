// app.js

const express = require('express');
const moviesRouter = require('./src/routes/movies.routes');
const nfoRouter = require('./src/routes/nfo.routes');
const corsMiddleware = require('./src/middleware/cors');
const app = express();
const cronJobs = require ('./cron_jobs/crons')

app.use(corsMiddleware);

app.use('/movies', moviesRouter);
app.use('/nfo', nfoRouter);

cronJobs.dailyMovieJsonFileUpdater();
app.listen(8888, function () {
  console.log('app listening on port 8888');
});
