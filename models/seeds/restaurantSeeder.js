const mongoose = require("mongoose");
const Restaurant = require("../restaurant");
const restaurantList = require("../restaurant.json").results;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("MongoDB is not connected.");
});

db.once("open", () => {
  console.log("MongoDB is connected!");
  Restaurant.create(restaurantList);
  console.log("The data of restaurants is imported.");
});
