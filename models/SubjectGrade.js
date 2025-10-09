const mongoose = require("mongoose");

const SubjectGradeSchema = new mongoose.Schema(
  {
    schoolName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    cutOffMark: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubjectGrade", SubjectGradeSchema);
