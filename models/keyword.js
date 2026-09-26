const mongoose = require("mongoose");

const keywordSchema = new mongoose.Schema(
  {
    business: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Business",
  required: true,
},
    keyword: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    response: {
      type: String,
      required: true,
      trim: true,
    },

    enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Keyword", keywordSchema);