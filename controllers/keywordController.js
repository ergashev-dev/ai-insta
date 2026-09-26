const Keyword = require("../models/keyword");

// Yangi keyword qo'shish
const createKeyword = async (req, res) => {
  try {
    const { keyword, response } = req.body;

    if (!keyword || !response) {
      return res.status(400).json({
        message: "Keyword va response kiritilishi kerak",
      });
    }

    const newKeyword = await Keyword.create({
      keyword,
      response,
    });

    return res.status(201).json({
      message: "Tezkor so'z qo'shildi ✅",
      data: newKeyword,
    });
  } catch (error) {
    console.error("Keyword qo'shish xatosi:", error.message);

    return res.status(500).json({
      message: "Server xatosi",
    });
  }
};

// Barcha keywordlarni olish
const getKeywords = async (req, res) => {
  try {
    const keywords = await Keyword.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      count: keywords.length,
      data: keywords,
    });
  } catch (error) {
    console.error("Keywordlarni olish xatosi:", error.message);

    return res.status(500).json({
      message: "Server xatosi",
    });
  }
};

// Keywordni yangilash
const updateKeyword = async (req, res) => {
  try {
    const { keyword, response } = req.body;

    const updatedKeyword = await Keyword.findByIdAndUpdate(
      req.params.id,
      {
        ...(keyword && {
          keyword: keyword.trim().toLowerCase(),
        }),

        ...(response && {
          response,
        }),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedKeyword) {
      return res.status(404).json({
        message: "Tezkor so'z topilmadi",
      });
    }

    return res.status(200).json({
      message: "Tezkor so'z yangilandi ✅",
      data: updatedKeyword,
    });
  } catch (error) {
    console.error(
      "Keyword yangilash xatosi:",
      error.message
    );

    return res.status(500).json({
      message: "Server xatosi",
    });
  }
};

// Keywordni yoqish / o'chirish
const toggleKeyword = async (req, res) => {
  try {
    const keyword = await Keyword.findById(req.params.id);

    if (!keyword) {
      return res.status(404).json({
        message: "Tezkor so'z topilmadi",
      });
    }

    keyword.enabled = !keyword.enabled;

    await keyword.save();

    return res.status(200).json({
      message: keyword.enabled
        ? "Tezkor so'z yoqildi ✅"
        : "Tezkor so'z o'chirildi ⏸️",

      data: keyword,
    });
  } catch (error) {
    console.error(
      "Keyword holatini o'zgartirish xatosi:",
      error.message
    );

    return res.status(500).json({
      message: "Server xatosi",
    });
  }
};

// Keywordni o'chirish
const deleteKeyword = async (req, res) => {
  try {
    const keyword = await Keyword.findByIdAndDelete(
      req.params.id
    );

    if (!keyword) {
      return res.status(404).json({
        message: "Tezkor so'z topilmadi",
      });
    }

    return res.status(200).json({
      message: "Tezkor so'z o'chirildi ✅",
    });
  } catch (error) {
    console.error(
      "Keyword o'chirish xatosi:",
      error.message
    );

    return res.status(500).json({
      message: "Server xatosi",
    });
  }
};

module.exports = {
  createKeyword,
  getKeywords,
  updateKeyword,
  toggleKeyword,
  deleteKeyword,
};