// Set Express and router
const express = require("express");
const router = express.Router();

// import routes
const home = require("./modules/home");
const details = require("./modules/details");
const addition = require("./modules/addition");
const edit = require("./modules/edit");
const deletion = require("./modules/delete");
const search = require("./modules/search");

// set routes
router.use("/", home);
router.use("/restaurant", details);
router.use("/", addition);
router.use("/restaurant", edit);
router.use("/restaurant", deletion);
router.use("/search", search);

// Export routes
module.exports = router;
