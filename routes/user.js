const express = require("express");
const router = express.Router();

const User = require("../models/User");

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

router.route("/signup").post(async (req, res) => {
  const { fullName, email, password, imageURL } = req.body;
  const user = await User.create({
    fullName,
    email,
    password,
    imageURL,
  });
  res.send(user);
});

router.route("/logout").get(async (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
