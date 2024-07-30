const mongoose = require("mongoose");

async function connectToMongoDB(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("MongoDB Connected Successfuly"))
    .catch((err) => console.log("Connection Error", err));
}

module.exports = {
  connectToMongoDB,
};
