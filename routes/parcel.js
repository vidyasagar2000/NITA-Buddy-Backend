const express = require("express");
const router = express.Router();
const ParcelRequest = require("../models/ParcelRequest");

router.post("/parcel-request", async (req, res) => {
  try {
    const { parcelDescription } = req.body;
    const parcelRequest = await ParcelRequest.create({
      requesterId: req.user._id,
      deliveryLocation: req.user.hostel,
      requesterPhoneNo: req.user.phoneNo,
      parcelDescription,
    });
    res.status(201).json(parcelRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/parcel-requests", async (req, res) => {
  try {
    const parcelRequests = await ParcelRequest.find().sort({ createdAt: -1 });
    res.status(200).json(parcelRequests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/parcel-request/:id", async (req, res) => {
  try {
    const parcelRequest = await ParcelRequest.findById(req.params.id);
    if (!parcelRequest) {
      return res.status(404).json({ message: "Parcel request not found" });
    }
    res.status(200).json(parcelRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/parcel-request/:id/accept", async (req, res) => {
  try {
    const initialParcel = await ParcelRequest.findById(req.params.id);
    if (!initialParcel) {
      return res.status(404).json({ message: "Parcel request not found" });
    }
    if (initialParcel.status !== "requested") {
      return res
        .status(400)
        .json({ message: "Parcel request cannot be accepted" });
    }
    // Update the parcel request in one operation
    const parcelRequest = await ParcelRequest.findByIdAndUpdate(
      req.params.id,
      {
        delivererId: req.user._id,
        status: "accepted",
        updatedAt: Date.now(),
      },
      { new: true } // Return the updated document
    );

    res.status(200).json({ message: "Parcel accepted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error is coming" });
  }
});

router.patch("/parcel-request/:id/complete", async (req, res) => {
  try {
    // Check the current status before updating
    const parcelRequest = await ParcelRequest.findById(req.params.id);

    if (!parcelRequest) {
      return res.status(404).json({ message: "Parcel request not found" });
    }

    if (parcelRequest.status !== "accepted") {
      return res
        .status(400)
        .json({ message: "Parcel request cannot be marked as delivered" });
    }

    // Update the status to "delivered" and set the updated time
    const updatedParcelRequest = await ParcelRequest.findByIdAndUpdate(
      req.params.id,
      {
        status: "delivered",
        updatedAt: Date.now(),
      },
      { new: true } // Return the updated document
    );

    res.status(200).json({ message: "Parcel Delivered Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/parcel-request/:id", async (req, res) => {
  try {
    const parcelRequest = await ParcelRequest.findById(req.params.id);

    if (!parcelRequest) {
      return res.status(404).json({ message: "Parcel request not found" });
    }

    await ParcelRequest.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Parcel request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});




module.exports = router;
