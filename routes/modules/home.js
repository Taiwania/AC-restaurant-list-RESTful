// Set Express and router
const express = require("express");
const router = express.Router();

// Import restaurant model
const Restaurant = require("../../models/restaurant");

// Home route
router.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

router.get("/", (req, res) => {
  let sortOption = {};

  switch (req.query.sort) {
    case "AtoZ":
      sortOption = { name: 1 };
      break;
    case "ZtoA":
      sortOption = { name: -1 };
      break;
    case "Category":
      sortOption = { category: 1 };
      break;
    case "Region":
      sortOption = { location: 1 };
      break;
    default:
      sortOption = { name: 1 };
      break;
  }

  return Restaurant.find()
    .lean()
    .sort(sortOption)
    .then((restaurant) => res.render("index", { restaurants: restaurant }))
    .catch((error) => console.log(error));
});

// Export router
module.exports = router;
