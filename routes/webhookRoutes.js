const express = require("express");

const {
  verifyWebhook,
  handleWebhook,
} = require("../controllers/webhookController");

const router = express.Router();

// Meta webhook verification
router.get("/", verifyWebhook);

// Instagram eventlarini qabul qilish
router.post("/", handleWebhook);

module.exports = router;