const mongoose = require("mongoose");

const reqLocationSchema = new mongoose.Schema(
  {
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
    description: {
      type: String,
    },
    imageURL: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
