const mongoose = require("mongoose");

const GradeMarksSchema = new mongoose.Schema(
  {
    schoolName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    gradeName: {
      type: String,
      required: true,
    },
    gradeRange: {
      type: String,
      required: true,
    },
    gradeRemark: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GradeMarks", GradeMarksSchema);
