require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connections");
const cors = require("cors");
const port = process.env.PORT || 3000;

const userRoute = require("./routes/user");
const parcelRouter = require("./routes/parcel");
const {
  checkForAuthenticationCookie,
  restrictTo,
} = require("./middlewares/authentication");

const dataBaseUrl =
  process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/NITABuddy";
connectToMongoDB(dataBaseUrl);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(checkForAuthenticationCookie("token"));

app.get("/", (req, res) => {
  return res.send("Hello Baccha");
});

app.use("/user", userRoute);
app.use("/parcel", restrictTo(["USER"]), parcelRouter);

app.listen(port, () => console.log(`Server is running on PORT: ${port}`));
