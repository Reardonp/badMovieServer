// movies.model.js
const mongoose = require("mongoose");
console.log("movieschema")

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Movie", MovieSchema);
