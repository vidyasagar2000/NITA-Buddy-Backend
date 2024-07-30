const JWT = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY || "vidya@sagar";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    imageURL: user.imageURL,
    role: user.role,
  };

  const token = JWT.sign(payload, secretKey);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secretKey);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
