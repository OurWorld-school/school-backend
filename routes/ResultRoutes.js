const Result = require("../models/Result");
const SubjectMarks = require("../models/SubjectMarks");
const User = require("../models/User");

const router = require("express").Router();

// /registerin

router.post("/", async (req, res) => {
  const userId = req.body.user;
  const { year, term, user, classes, schoolName } = req.body;
  const schoolId = req.body.school;
  const modifyTerm = term.replace(/\s+/g, "_");
  // Assuming the request body contains the Biology data as an array of test and exam objects
  // const subjectId = await subjects.map((item) => ({
  //   subject: item.subject,
  // }));
  // const modifyClass = class.replace(/\s+/g, "-");
  // Calculate the total score for each entry in the Biology array

  try {
    const ResultAlreadyExits = await Result.findOne({
      year,
      term,
      user: userId,
      classes,
    });

    if (ResultAlreadyExits) {
      return res.status(404).json({ message: "User Result already Exits" });
    }

    // Create a new result document in the database with the Biology array containing total scores
    const newResult = new Result({
      subjects: req.body.subjects,
      //   subjects: subjectObj.map((subject) => subject._id),
      user: userId,
      classes: classes,
      year: year,
      term: modifyTerm,
      schoolRegNumber: req.body.schoolRegNumber,
      TotalScore: req.body.TotalScore,
      TotalAverage: req.body.TotalAverage,
      schoolName: req.body.schoolName,
      school: req.body.school,
      Position: req.body.Position,
      numberInClass: req.body.numberInClass,
      Remark: req.body.Remark,
      HmRemark: req.body.HmRemark,
      TotalGrade: req.body.TotalGrade,
      Signature: req.body.Signature,
      schoolName: req.body.schoolName,
    });
    await newResult.save();
    // Update the user's document with the new result ID

    await User.findByIdAndUpdate(userId, {
      $push: { results: newResult._id },
    });
    return res.status(201).json(newResult);
  } catch (error) {
    return res.status(500).json({ error: "Failed to save the result." });
  }
});
router.get("/", async (req, res) => {
  try {
    const results = await Result.find({})
      .sort({ createdAt: -1 })
      .populate("subjects")

      .populate("user", [
        "firstName",
        "lastName",
        "schoolRegNumber",
        "currentClass",
        "passportPhoto",
      ])
      .populate("school", [
        "name",
        "address",
        "postalCode",
        "state",
        "city",
        "country",
        "phoneNumber",
        "schoolLogo",
        "schoolStamp",
      ]);

    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate("subjects")

      .populate("user", [
        "firstName",
        "lastName",
        "schoolRegNumber",
        "currentClass",
        "passportPhoto",
      ])
      .populate("school", [
        "name",
        "address",
        "postalCode",
        "state",
        "city",
        "country",
        "phoneNumber",
        "schoolLogo",
      ]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/results/:school/:classes/:user/:year/:term/", async (req, res) => {
  try {
    const { user, year, term, classes, school } = req.params;

    // Use the parameters to query the database
    const results = await Result.findOne({
      user,
      year,
      school,
      classes,
      term,
    })
      .populate("subjects")

      .populate("user", [
        "firstName",
        "lastName",
        "schoolRegNumber",
        "currentClass",
        "passportPhoto",
      ])
      .populate("school", [
        "name",
        "address",
        "postalCode",
        "state",
        "city",
        "country",
        "phoneNumber",
        "schoolLogo",
      ]);

    if (!results) {
      return res.status(404).json({ message: "Result not found" });
    }

    // Return the result as JSON
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(200).json({ message: "This User result has been deleted" });
    } else {
      res.status(404).json({ message: "Result not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const {
    year,
    term,
    TotalScore,
    TotalAverage,
    numberInClass,
    TotalGrade,
    Remark,
    HmRemark,
    schoolRegNumber,
  } = req.body;
  const modifyTerm = term.replace(/\s+/g, "_");
  try {
    const subjectsMarks = await Result.findById(id);

    if (!subjectsMarks) {
      return res.status(404).json({ message: "Class Subject not found" });
    }

    // Update the user's current class
    subjectsMarks.numberInClass = numberInClass || subjectsMarks.numberInClass;
    subjectsMarks.TotalScore = TotalScore || subjectsMarks.TotalScore;
    subjectsMarks.TotalAverage = TotalAverage || subjectsMarks.TotalAverage;
    subjectsMarks.TotalGrade = TotalGrade || subjectsMarks.TotalGrade;
    subjectsMarks.year = year || subjectsMarks.year;
    subjectsMarks.term = modifyTerm || subjectsMarks.term;
    subjectsMarks.Remark = Remark || subjectsMarks.Remark;
    subjectsMarks.HmRemark = HmRemark || subjectsMarks.HmRemark;
    subjectsMarks.schoolRegNumber =
      schoolRegNumber || subjectsMarks.schoolRegNumber;
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
    const result = await Result.updateMany(
      { schoolName, classes, year, modifyTerm },
      { $set: { deActivateResultEdith: true } }
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.put("/updateResultPosition/:id", async (req, res) => {
  const { id } = req.params;
  const { Position } = req.body;

  try {
    const prenurseryresult = await Result.findById(id);

    if (!prenurseryresult) {
      return res.status(404).json({ message: "Result not found" });
    }

    // Update the user's current class
    prenurseryresult.Position = Position || prenurseryresult.Position;
    await prenurseryresult.save();

    res.json({ message: "Result Position updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update" });
  }
});
///////Asign position Automatically
router.post("/update-positions", async (req, res) => {
  const { schoolName, classes, year, term } = req.body;

  try {
    // Fetch students from the same school, class, year, and term, sorted by grandAverage in descending order
    const students = await Result.find({
      schoolName,
      classes,
      year,
      term,
    }).sort({ TotalAverage: -1 });

    // Update positions
    for (let i = 0; i < students.length; i++) {
      let position = `${i + 1}${getOrdinalSuffix(i + 1)}`;
      students[i].Position = position;
      await students[i].save();
    }

    res.json({ message: "Positions updated successfully", students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Function to get ordinal suffix (1st, 2nd, 3rd, etc.)
function getOrdinalSuffix(i) {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return "st";
  }
  if (j === 2 && k !== 12) {
    return "nd";
  }
  if (j === 3 && k !== 13) {
    return "rd";
  }
  return "th";
}
router.post("/update-positions-tie", async (req, res) => {
  const { schoolName, classes, year, term } = req.body;

  try {
    // Fetch students from the same school, class, year, and term, sorted by TotalAverage in descending order
    const students = await Result.find({
      schoolName,
      classes,
      year,
      term,
    }).sort({ TotalAverage: -1 });

    // Update positions with handling ties
    let position = 1;
    for (let i = 0; i < students.length; i++) {
      if (i > 0 && students[i].TotalAverage === students[i - 1].TotalAverage) {
        // If current student's TotalAverage is the same as the previous student, assign the same position
        students[i].Position = students[i - 1].Position;
      } else {
        // Otherwise, assign the current position
        students[i].Position = `${position}${getOrdinalSuffix(position)}`;
      }

      // Save the updated student record
      await students[i].save();

      // Increment the position count, but skip the number of tied students
      if (i > 0 && students[i].TotalAverage !== students[i - 1].TotalAverage) {
        position = i + 1;
      }
    }

    res.json({ message: "Positions updated successfully", students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Function to get ordinal suffix (1st, 2nd, 3rd, etc.)
function getOrdinalSuffix(i) {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return "st";
  }
  if (j === 2 && k !== 12) {
    return "nd";
  }
  if (j === 3 && k !== 13) {
    return "rd";
  }
  return "th";
}
module.exports = router;
