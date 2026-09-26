const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    instagramAccountId: {
      type: String,
      required: true,
      unique: true,
    },

    accessToken: {
      type: String,
      required: true,
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

module.exports = mongoose.model("Business", businessSchema);