const GradeMarks = require("../models/GradeMarks");

const router = require("express").Router();

// /registerin

router.post("/", async (req, res) => {
  const { gradeName, gradeRemark } = req.body;
  const schoolId = req.body.schoolName;
  const modifyName = gradeName.replace(/\s+/g, "_");
  const modifyRemark = gradeRemark.replace(/\s+/g, "_");
  try {
    const existingGrade = await GradeMarks.findOne({
      gradeName,
      schoolName: schoolId,
    });

    if (existingGrade) {
      return res.status(409).json({
        error: "Result Grade already exists from this particular School.",
      });
    }
    //create new user

    const newGrade = new GradeMarks({
      gradeName: modifyName,
      gradeRemark: modifyRemark,
      gradeRange: req.body.gradeRange,
      schoolName: req.body.schoolName,
    });

    const grades = await newGrade.save();

    res.status(200).json({
      _id: grades._id,
      schoolName: grades.schoolName,
      gradeName: grades.gradeName,
      gradeRange: grades.gradeRange,
      gradeRemark: grades.gradeRemark,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const grades = await GradeMarks.find({})
      .sort({ createdAt: -1 })
      .populate("schoolName", ["name"]);
    res.json(grades);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const grades = await GradeMarks.findById(req.params.id).populate(
      "schoolName",
      ["name"]
    );

    res.status(200).json(grades);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const grades = await GradeMarks.findByIdAndDelete(req.params.id);
    if (grades) {
      res.status(200).json({ message: "This Result Grade has been deleted" });
    } else {
      res.status(404).json({ message: "Result Grade not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { gradeName, gradeRemark, gradeRange } = req.body;
  try {
    const grades = await GradeMarks.findById(id);

    if (!grades) {
      return res.status(404).json({ message: "Result Grade not found" });
    }

    // Update the user's current class
    grades.gradeName = gradeName.replace(/\s+/g, "_") || grades.gradeName;
    grades.gradeRemark = gradeRemark.replace(/\s+/g, "_") || grades.gradeRemark;
    gradeRange = gradeRange || grades.gradeRange;
    await grades.save();

    res.json({ message: "Result Grade updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
