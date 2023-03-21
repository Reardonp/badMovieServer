const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nfoSchema = new Schema({
  movie: {
    title: [{ type: String }],
    originaltitle: [{ type: String }],
    sorttitle: [{ type: String }],
    epbookmark: [{ type: String }],
    year: [{ type: String }],
    ratings: [{
      rating: [{
        default: { type: Boolean },
        max: { type: Number },
        name: { type: String },
        value: [{ type: Number }],
        votes: [{ type: Number }],
      }],
    }],
    userrating: [{ type: Number }],
    top250: [{ type: Number }],
    set: [{ type: String }],
    plot: [{ type: String }],
    outline: [{ type: String }],
    tagline: [{ type: String }],
    runtime: [{ type: String }],
    thumb: [{
      _: { type: String },
      aspect: { type: String },
    }],
    fanart: [{
      thumb: [{ type: String }],
    }],
    mpaa: [{ type: String }],
    certification: [{ type: String }],
    id: [{ type: String }],
    tmdbid: [{ type: String }],
    uniqueid: [{
      _: { type: String },
      default: { type: Boolean },
      type: { type: String },
    }],
    country: [{ type: String }],
    status: [{ type: String }],
    code: [{ type: String }],
    premiered: [{ type: String }],
    watched: [{ type: Boolean }],
    playcount: [{ type: Number }],
    lastplayed: [{ type: String }],
    genre: [{ type: String }],
    studio: [{ type: String }],
    credits: [{
      _: { type: String },
      tmdbid: { type: String },
    }],
    director: [{
      _: { type: String },
      tmdbid: { type: String },
    }],
    tag: [{ type: String }],
    actor: [{
      name: [{ type: String }],
      role: [{ type: String }],
      thumb: [{ type: String }],
      profile: [{ type: String }],
      tmdbid: [{ type: String }],
    }],
  },
},
{timestamps: true});
module.exports = mongoose.model("Nfo", nfoSchema);
