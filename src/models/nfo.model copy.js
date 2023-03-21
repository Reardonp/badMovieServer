const mongoose = require("mongoose");

const NfoSchema = new mongoose.Schema({
  movie: {
    title: {
      type: "String",
    },
    originaltitle: {
      type: "String",
    },
    sorttitle: {
      type: "String",
    },
    epbookmark: {
      type: "String",
    },
    year: {
      type: "Number",
    },
    ratings: {
      rating: {
        value: {
          type: "Number",
        },
        votes: {
          type: "Number",
        },
      },
    },
    userrating: {
      type: "Number",
    },
    top250: {
      type: "Number",
    },
    set: {
      type: "String",
    },
    plot: {
      type: "String",
    },
    outline: {
      type: "String",
    },
    tagline: {
      type: "String",
    },
    runtime: {
      type: "Number",
    },
    thumb: {
      type: "String",
    },
    fanart: {
      thumb: {
        type: "String",
      },
    },
    mpaa: {
      type: "String",
    },
    certification: {
      type: "String",
    },
    id: {
      type: "String",
    },
    tmdbid: {
      type: "Number",
    },
    uniqueid: {
      type: ["Mixed"],
    },
    country: {
      type: "String",
    },
    status: {
      type: "String",
    },
    code: {
      type: "String",
    },
    premiered: {
      type: "Date",
    },
    watched: {
      type: "Boolean",
    },
    playcount: {
      type: "Number",
    },
    lastplayed: {
      type: "String",
    },
    genre: {
      type: ["String"],
    },
    studio: {
      type: "String",
    },
    credits: {
      type: "String",
    },
    director: {
      type: "String",
    },
    tag: {
      type: ["String"],
    },
    actor: {
      type: ["Mixed"],
    },
    producer: {
      type: ["Mixed"],
    },
    trailer: {
      type: "String",
    },
    languages: {
      type: "String",
    },
    dateadded: {
      type: "Date",
    },
    fileinfo: {
      streamdetails: {
        video: {
          codec: {
            type: "String",
          },
          aspect: {
            type: "Number",
          },
          width: {
            type: "Number",
          },
          height: {
            type: "Number",
          },
          durationinseconds: {
            type: "Number",
          },
          stereomode: {
            type: "String",
          },
        },
        audio: {
          codec: {
            type: "String",
          },
          language: {
            type: "String",
          },
          channels: {
            type: "Number",
          },
        },
      },
    },
    source: {
      type: "String",
    },
    edition: {
      type: "String",
    },
    original_filename: {
      type: "String",
    },
    user_note: {
      type: "String",
    },
  },
});

module.exports = mongoose.model("Nfo", NfoSchema);
