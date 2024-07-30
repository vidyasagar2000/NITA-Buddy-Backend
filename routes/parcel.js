const express = require("express");
const router = express.Router();
const ParcelRequest = require("../models/ParcelRequest");
const authMiddleware = require("../middlewares/auth");

// router.post("/parcel-request", authMiddleware, async (req, res) => {
router.post("/parcel-request", authMiddleware, async (req, res) => {
  try {
    const { pickupLocation, parcelDescription, status } = req.body;

    const parcelRequest = await ParcelRequest.create({
    //   requesterId: req.user.id,
      pickupLocation,
    //   deliveryLocation: req.user.hostel,
      parcelDescription,
      status,
    });
    console.log("Making Parcel");
    res.status(201).json(parcelRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// router.get("/parcel-requests", authMiddleware, async (req, res) => {
router.get("/parcel-requests", async (req, res) => {
  try {
    const parcelRequests = await ParcelRequest.find().sort({ createdAt: -1 });
    res.json(parcelRequests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// router.get("/parcel-request/:id", authMiddleware, async (req, res) => {
router.get("/parcel-request/:id", async (req, res) => {
  try {
    const parcelRequest = await ParcelRequest.findById(req.params.id);

    if (!parcelRequest) {
      return res.status(404).json({ message: "Parcel request not found" });
    }

    res.json(parcelRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// router.post("/parcel-request/:id/accept", authMiddleware, async (req, res) => {
router.post("/parcel-request/:id/accept", async (req, res) => {
  try {
    const parcelRequest = await ParcelRequest.findById(req.params.id);

    if (!parcelRequest) {
      return res.status(404).json({ message: "Parcel request not found" });
    }

    if (parcelRequest.status !== "requested") {
      return res
        .status(400)
        .json({ message: "Parcel request cannot be accepted" });
    }

    parcelRequest.delivererId = req.user.id;
    parcelRequest.status = "accepted";
    parcelRequest.updatedAt = Date.now();

    await parcelRequest.save();
    res.json(parcelRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// router.post(
//   "/parcel-request/:id/complete",
//   authMiddleware,
router.post("/parcel-request/:id/complete", async (req, res) => {
  try {
    const parcelRequest = await ParcelRequest.findById(req.params.id);

    if (!parcelRequest) {
      return res.status(404).json({ message: "Parcel request not found" });
    }

    if (parcelRequest.status !== "in_transit") {
      return res
        .status(400)
        .json({ message: "Parcel request cannot be marked as delivered" });
    }

    parcelRequest.status = "delivered";
    parcelRequest.updatedAt = Date.now();

    await parcelRequest.save();
    res.json(parcelRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
