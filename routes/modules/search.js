// Set Express and router
const express = require("express");
const router = express.Router();

// Import restaurant model
const Restaurant = require("../../models/restaurant");

// search
router.get("/", (req, res) => {
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

// Export router
module.exports = router;
