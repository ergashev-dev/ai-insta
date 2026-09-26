const express = require("express");

const {
  createBusiness,
} = require("../controllers/businessController");

const router = express.Router();

// Yangi business qo'shish
router.post("/", createBusiness);

module.exports = router;