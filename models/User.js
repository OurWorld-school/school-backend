const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ObjectId } = mongoose.Schema.Types;
const UserSchema = new mongoose.Schema(
  {
    schoolName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    schoolRegNumber: {
      type: String,
      unique: true,
    },

    passportPhoto: {
      type: String,
    },

    // currentClass: {
    //   type: String,
    // },

    currentClass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    contactAdress: {
      type: String,
      required: true,
      max: 100,
    },
    roles: { type: String },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    archiveStudent: {
      type: Boolean,
      default: false,
    },
    deactivateUserRole: {
      type: Boolean,
      default: false,
    },
    userType: { type: String, default: "Student" },

    results: [{ type: mongoose.Schema.Types.ObjectId, ref: "Result" }],
    communativeResults: [
      { type: mongoose.Schema.Types.ObjectId, ref: "CommunativeResult" },
    ],
    password: {
      type: String,
      // required: true,
      min: 6,
      max: 12,
      default: "123456",
    },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
    prenurseryresult: [
      { type: mongoose.Schema.Types.ObjectId, ref: "PresNurseryResult" },
    ],
    nursery1result: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Nursery1result" },
    ],
    nursery2result: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Nursery2result" },
    ],
    nursery3result: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Nursery3result" },
    ],
    basic1result: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Basic1result" },
    ],
    basic2result: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Basic2result" },
    ],
    basic3result: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Basic3result" },
    ],
    basic4result: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Basic4result" },
    ],
    prenurserycommulative: [
      { type: mongoose.Schema.Types.ObjectId, ref: "PreNurseryCommulative" },
    ],
    nursery1commulative: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Nusery1Commulative" },
    ],
    nursery2commulative: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Nusery2Commulative" },
    ],
    nursery3commulative: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Nusery3Commulative" },
    ],
    basic1commulative: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Basic1Commulative" },
    ],
    basic2commulative: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Basic2Commulative" },
    ],
    basic3commulative: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Basic3Commulative" },
    ],
    basic4commulative: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Basic4Commulative" },
    ],
  },

  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", UserSchema);
