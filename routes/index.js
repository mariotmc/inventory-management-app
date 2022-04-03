const express = require("express");
const router = express.Router();

// GET home page
router.get("/", (req, res, next) => {
  res.render("index", { title: "Home" });
});

router.get("/admin", (req, res, next) => {
  res.render("admin", { title: "Admin" });
});

module.exports = router;
