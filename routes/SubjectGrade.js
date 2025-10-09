const GradeMarks = require("../models/GradeMarks");
const SubjectGrade = require("../models/SubjectGrade");

const router = require("express").Router();

// /registerin

router.post("/", async (req, res) => {
  const { name } = req.body;
  const schoolId = req.body.schoolName;

  try {
    const existingGrade = await SubjectGrade.findOne({
      name,
      schoolName: schoolId,
    });

    if (existingGrade) {
      return res.status(409).json({
        error: "Result Grade already exists from this particular School.",
      });
    }
    //create new user

    const newGrade = new SubjectGrade({
      name: req.body.name,

      cutOffMark: req.body.cutOffMark,
      schoolName: req.body.schoolName,
    });

    const grades = await newGrade.save();

    res.status(200).json({
      _id: grades._id,
      schoolName: grades.schoolName,
      name: grades.name,
      cutOffMark: grades.cutOffMark,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const grades = await SubjectGrade.find({})
      .sort({ createdAt: -1 })
      .populate("schoolName", ["name"]);
    res.json(grades);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const grades = await SubjectGrade.findById(req.params.id).populate(
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
    const grades = await SubjectGrade.findByIdAndDelete(req.params.id);
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
  const { name, cutOffMark } = req.body;
  try {
    const grades = await SubjectGrade.findById(id);

    if (!grades) {
      return res.status(404).json({ message: "Result Grade not found" });
    }

    // Update the user's current class
    grades.name = name || grades.name;
    grades.cutOffMark = cutOffMark || grades.cutOffMark;
    await grades.save();

    res.json({ message: "Result Grade updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
