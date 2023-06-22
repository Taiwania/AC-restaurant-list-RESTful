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

// Export router
module.exports = router;
