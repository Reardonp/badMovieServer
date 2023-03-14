const mongoose = require('mongoose');

const NfoSchema = new mongoose.Schema({
  title: String,
  originaltitle: String,
  sorttitle: String,
  year: Number,
  ratings: [{
    name: String,
    value: Number,
    votes: Number,
    default: Boolean,
    max: Number
  }],
  userrating: Number,
  top250: Number,
  set: String,
  plot: String,
  outline: String,
  tagline: String,
  runtime: Number,
  thumb: String,
  fanart: [{
    thumb: String
  }],
  mpaa: String,
  certification: String,
  id: String,
  tmdbid: String,
  uniqueid: [{
    type: String,
    value: String,
    default: Boolean
  }],
  country: String,
  status: String,
  code: String,
  premiered: String,
  watched: Boolean,
  playcount: Number,
  lastplayed: String,
  genre: [String],
  studio: String,
  credits: [{
    tmdbid: String,
    name: String
  }],
  director: [{
    tmdbid: String,
    name: String
  }],
  tag: [String],
  actor: [{
    name: String,
    role: String,
    thumb: String,
    profile: String,
    tmdbid: String
  }],
  producer: [{
    tmdbid: String,
    name: String,
    thumb: String
  }]
});

module.exports = mongoose.model('Nfo', NfoSchema);
