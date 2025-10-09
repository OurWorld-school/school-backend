const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    schoolRegCode: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    schoolLogo: {
      type: String,
    },
    schoolStamp: {
      type: String,
    },
    schoolType: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },

    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },

    noScratchCard: [
      { type: mongoose.Schema.Types.ObjectId, ref: "NoScratchCardSell" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("School", SchoolSchema);
