const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.route("/signup").post(async (req, res) => {
  const {
    fullName,
    email,
    password,
    phoneNo,
    enrollmentNo,
    hostel,
    branch,
    year,
    imageURL,
  } = req.body;

  let existingUser = await User.findOne({ email });
  if (existingUser) res.send("User Already Exist with this email");
  existingUser = await User.findOne({ phoneNo });
  if (existingUser) res.send("User Already Exist with this PhoneNo");

  // Assigned when accepted
  const user = await User.create({
    fullName,
    email,
    password,
    phoneNo,
    enrollmentNo,
    imageURL,
    hostel,
    branch,
    year,
  });
  res.send(user);
});

router.route("/signin").post(async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).send("Successfully SignedIn");
  } catch (error) {
    return res.json({
      error: "Incorrect Email or Password",
    });
  }
});

router.route("/logout").get(async (req, res) => {
  res.clearCookie("token").send("Logged Out Successfully");
});

router
  .route("/")
  .get(async (req, res) => {
    try {
      res.json(req.user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  })
  .put(async (req, res) => {
    const { fullName, phoneNumber, address } = req.body;

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { fullName, phoneNumber, address },
        { new: true, runValidators: true }
      );

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;

module.exports = router;
