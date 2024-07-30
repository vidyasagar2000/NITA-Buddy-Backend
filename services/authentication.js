const JWT = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY || "vidya@sagar";

function createTokenForUser(user) {
  user.password = null;
  const payload = { ...user };

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
