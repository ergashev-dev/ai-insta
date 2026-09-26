const express = require("express");

const {
  createKeyword,
  getKeywords,
  updateKeyword,
  toggleKeyword,
  deleteKeyword,
} = require("../controllers/keywordController");

const router = express.Router();

// Keyword qo'shish
router.post("/", createKeyword);

// Barcha keywordlarni olish
router.get("/", getKeywords);

// Keywordni yangilash
router.put("/:id", updateKeyword);

// Keywordni yoqish / o'chirish
router.patch("/:id/toggle", toggleKeyword);

// Keywordni o'chirish
router.delete("/:id", deleteKeyword);

module.exports = router;