const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  importantData: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
},{ timestamps: true });

const Place = mongoose.model("place", placeSchema);

module.exports = Place;
