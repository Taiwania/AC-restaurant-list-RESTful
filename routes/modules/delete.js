// Set Express and router
const express = require("express");
const router = express.Router();

// Import restaurant model
const Restaurant = require("../../models/restaurant");

// Delete
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

// Export router
module.exports = router;
