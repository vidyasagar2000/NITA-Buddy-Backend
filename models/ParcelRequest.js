const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parcelRequestSchema = new Schema({
  requesterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  requesterPhoneNo: {
    type: String,
    required: true,
  },
  delivererId: {
    //  Assigned when accepted
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  parcelCompany: {
    type: String,
    required: true,
    default: "flipkart",
  },
  pickupLocation: {
    type: String,
    required: true,
    default: "Gate No. 2",
  },
  deliveryLocation: {
    type: String,
    required: true,
    default: "RNT",
  },
  parcelDescription: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["requested", "accepted", "in_transit", "delivered", "cancelled"],
    default: "requested",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ParcelRequest = mongoose.model("ParcelRequest", parcelRequestSchema);
module.exports = ParcelRequest;
