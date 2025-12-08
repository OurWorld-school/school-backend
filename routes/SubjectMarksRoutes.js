const Class = require("../models/Class");
const SubjectMarks = require("../models/SubjectMarks");
const Subjects = require("../models/Subjects");

const router = require("express").Router();

// /registerin
router.post("/", async (req, res) => {
  const classId = req.body.classes;
  const schoolId = req.body.schoolName;
  const userId = req.body.user;
  const { year, term, subjects } = req.body;

  const modifyTerm = term.replace(/\s+/g, "_");

  const subjectScore = subjects.map((item) => ({
    subjectName: item.subjectName,
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));

  try {
    // Extract subject names
    const subjectNames = subjects.map((s) => s.subjectName);

    // Prevent duplicate entries
    const existingSubjectMarks = await SubjectMarks.findOne({
      user: userId,
      schoolName: schoolId,
      classes: classId,
      year,
      term: modifyTerm,
      "subjects.subjectName": { $in: subjectNames },
    });

    if (existingSubjectMarks) {
      return res.status(409).json({
        error:
          "One or more subjects already exist for this user in the selected term and year.",
      });
    }

    // Create new result
    const newSubjectMarks = new SubjectMarks({
      subjects: subjectScore,
      user: userId,
      classes: classId,
      year,
      term: modifyTerm,
      schoolName: schoolId,
    });

    const subjectsMarks = await newSubjectMarks.save();

    res.status(200).json({
      _id: subjectsMarks._id,
      user: subjectsMarks.user,
      subjects: subjectsMarks.subjects,
      classes: subjectsMarks.classes,
      year: subjectsMarks.year,
      schoolName: subjectsMarks.schoolName,
      term: subjectsMarks.term,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/old", async (req, res) => {
  const classId = req.body.classes;
  const schoolId = req.body.schoolName;
  const userId = req.body.user;
  const { year, term, subjects, subjectName } = req.body;
  const modifyTerm = term.replace(/\s+/g, "_");

  const subjectScore = subjects.map((item) => ({
    subjectName: item.subjectName,
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));

  try {
    // const subjectId = await Subjects.findById(req.params.id);

    const existingSubjectMarks = await SubjectMarks.findOne({
      classes: classId,
      schoolName: schoolId,
      subjectName,
      user: userId,
      year,
      term,
    });

    if (existingSubjectMarks) {
      return res
        .status(409)
        .json({ error: "Subject Score Sheet for this user already exists." });
    }
    //create new user

    const newSubjectMarks = new SubjectMarks({
      subjects: subjectScore,
      user: req.body.user,
      classes: req.body.classes,
      year: req.body.year,
      term: modifyTerm,
      schoolName: req.body.schoolName,
    });

    const subjectsMarks = await newSubjectMarks.save();

    res.status(200).json({
      _id: subjectsMarks._id,
      user: subjectsMarks.user,
      subjects: subjectsMarks.subjects,
      classes: subjectsMarks.classes,
      year: subjectsMarks.year,
      schoolName: subjectsMarks.schoolName,
      term: subjectsMarks.term,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const subjectsMarks = await SubjectMarks.find({})
      .sort({ createdAt: -1 })
      .populate("classes", ["name"])
      .populate("subjects")
      .populate("user", [
        "firstName",
        "lastName",
        "schoolRegNumber",
        "currentClass",
        "passportPhoto",
      ])
      .populate("schoolName", ["name"]);
    res.json(subjectsMarks);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const subjectsMarks = await SubjectMarks.findById(req.params.id)
      .populate("classes", ["name"])
      .populate("subjects")
      .populate("user", [
        "firstName",
        "lastName",
        "schoolRegNumber",
        "currentClass",
        "passportPhoto",
      ])
      .populate("schoolName", ["name"]);

    res.status(200).json(subjectsMarks);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const subjectsMarks = await SubjectMarks.findByIdAndDelete(req.params.id);
    if (subjectsMarks) {
      res
        .status(200)
        .json({ message: "This Class Subject Marks has been deleted" });
    } else {
      res.status(404).json({ message: "Class Subject Marks not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put("/updated/:id", async (req, res) => {
  const { id } = req.params;

  const { year, term, subjects } = req.body; // Assuming the request body contains the Biology data as an array of test and exam objects
  const modifyTerm = term.replace(/\s+/g, "_");
  const FrenchresultsWithTotal = subjects.map((item) => ({
    subjectName: item.subjectName,
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));

  try {
    const prenurseryresult = await SubjectMarks.findById(id);

    if (!prenurseryresult) {
      return res.status(404).json({ message: "SubjectMarks not found" });
    }

    // Update the user's current class

    prenurseryresult.year = year || prenurseryresult.year;
    prenurseryresult.term = modifyTerm || prenurseryresult.term;
    prenurseryresult.subjects =
      FrenchresultsWithTotal || prenurseryresult.subjects;

    await prenurseryresult.save();

    res.json({ message: "Subject Score updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update" });
  }
});
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;

  const { classes, year, term, subjects, user, schoolName } = req.body;
  const modifyTerm = term.replace(/\s+/g, "_");
  const subjectScore = subjects.map((item) => ({
    subjectName: item.subjectName,
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));

  try {
    const subjectsMarks = await SubjectMarks.findById(id);

    if (!subjectsMarks) {
      return res.status(404).json({ message: "Class Subject not found" });
    }

    // Update the user's current class
    subjectsMarks.subjects = subjectScore || subjectsMarks.subjects;
    subjectsMarks.classes = classes || subjectsMarks.classes;
    subjectsMarks.year = year || subjectsMarks.year;
    subjectsMarks.term = modifyTerm || subjectsMarks.term;
    subjectsMarks.user = user || subjectsMarks.user;
    subjectsMarks.schoolName = schoolName || subjectsMarks.schoolName;
    await subjectsMarks.save();

    res.json({ message: "Subject Score updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.put("/deactivateResultEdit", async (req, res) => {
  try {
    const { schoolName, classes, year, term } = req.body;
    const modifyTerm = term.replace(/\s+/g, "_");
    // Update all records that match the criteria
    const result = await SubjectMarks.updateMany(
      { schoolName, classes, year, modifyTerm },
      { $set: { deActivateResultEdith: true } }
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
