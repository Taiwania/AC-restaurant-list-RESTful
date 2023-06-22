// set mongoose, method-override, express, router and port
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const router = require('./routes')

// set handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// import bootstrap, popper, method-override, routers and URL encoder
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(router)

// dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Mongoose setting and connect the mongoDB
mongoose.set("useFindAndModify", false);
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
});

// import restaurant lists
const Restaurant = require("./models/restaurant");

// search
app.get("/search", (req, res) => {
  if (!req.query.keyword) {
    res.redirect("/");
  }

  const keyword = req.query.keyword.trim().toLocaleLowerCase();
  const filter = {
    $or: [
      { name: new RegExp(keyword, "i") },
      { category: new RegExp(keyword, "i") },
    ],
  };
  return Restaurant.find(filter)
    .lean()
    .then((restaurant) =>
      res.render("index", { restaurants: restaurant, keyword: keyword })
    )
    .catch((error) => console.log(error));
});

// online listener
app.listen(port, () => {
  console.log(`The website http://localhost:${port} is online.`);
});
