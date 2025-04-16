const Nursery1result = require("../models/Nursery1result");
const User = require("../models/User");

const router = require("express").Router();
router.post("/", async (req, res) => {
  const userId = req.body.user;
  const {
    English,
    Mathematics,
    SocialHabit,
    HealthScience,
    BasicScience,
    AgricScience,
    Rhymes,
    year,
    term,
    user,
    classes,
    Phonics,
    CreativeArt,
    // class,
    Writing,
  } = req.body; // Assuming the request body contains the Biology data as an array of test and exam objects

  // const modifyClass = class.replace(/\s+/g, "-");
  // Calculate the total score for each entry in the Biology array
  const EnglishresultsWithTotal = English.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const MathsresultsWithTotal = Mathematics.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const SocialHabitresultsWithTotal = SocialHabit.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const HealthScienceresultsWithTotal = HealthScience.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const BasicScienceresultsWithTotal = BasicScience.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const AgricresultsWithTotal = AgricScience.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const RhymesresultsWithTotal = Rhymes.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const WritingresultsWithTotal = Writing.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const PhonicsresultsWithTotal = Phonics.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const CreativeArtresultsWithTotal = CreativeArt.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  // const grandTotal = English.totalScore + Mathematics.totalScore;

  try {
    const ResultAlreadyExits = await Nursery1result.findOne({
      year,
      term,
      classes,
      user,
    });
    //    && (await User.findById(req.params.userId));

    if (ResultAlreadyExits) {
      return res.status(404).json({ message: "User Result already Exits" });
    }

    // Create a new result document in the database with the Biology array containing total scores
    const newResult = new Nursery1result({
      English: EnglishresultsWithTotal,
      Mathematics: MathsresultsWithTotal,
      BasicScience: BasicScienceresultsWithTotal,
      HealthScience: HealthScienceresultsWithTotal,
      Rhymes: RhymesresultsWithTotal,
      AgricScience: AgricresultsWithTotal,
      Writing: WritingresultsWithTotal,
      SocialHabit: SocialHabitresultsWithTotal,
      Phonics: PhonicsresultsWithTotal,
      CreativeArt: CreativeArtresultsWithTotal,
      user: userId,
      classes: classes,
      year: year,
      term: term,
      schoolRegNumber: req.body.schoolRegNumber,
      TotalScore: req.body.TotalScore,
      TotalAverage: req.body.TotalAverage,
      Position: req.body.Position,
      numberInClass: req.body.numberInClass,
      Remark: req.body.Remark,
      HmRemark: req.body.HmRemark,
      TotalGrade: req.body.TotalGrade,
      Signature: req.body.Signature,
    });
    await newResult.save();
    // Update the user's document with the new result ID

    await User.findByIdAndUpdate(userId, {
      $push: { nursery1result: newResult._id },
    });
    return res.status(201).json(newResult);
  } catch (error) {
    return res.status(500).json({ error: "Failed to save the result." });
  }
});
router.get("/", async (req, res) => {
  try {
    const nursery1results = await Nursery1result.find({})
      .sort({ createdAt: -1 })
      .populate("user", [
        "firstName",
        "lastName",
        "passportPhoto",
        "schoolRegNumber",
      ]);

    res.json(nursery1results);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const nursery1result = await Nursery1result.findById(
      req.params.id
    ).populate("user", [
      "firstName",
      "lastName",
      "passportPhoto",
      "schoolRegNumber",
    ]);
    res.status(200).json(nursery1result);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/results/:user/:year/:term/", async (req, res) => {
  try {
    const { user, year, term } = req.params;

    // Use the parameters to query the database
    const nursery1result = await Nursery1result.findOne({
      user,
      year,
      term,
    }).populate("user", [
      "firstName",
      "lastName",
      "passportPhoto",
      "schoolRegNumber",
    ]);

    if (!nursery1result) {
      return res.status(404).json({ message: "Result not found" });
    }

    // Return the result as JSON
    res.json(nursery1result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/updateResultPosition/:id", async (req, res) => {
  const { id } = req.params;
  const { Position } = req.body;

  try {
    const prenurseryresult = await Nursery1result.findById(id);

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
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const {
    English,
    Mathematics,
    SocialHabit,
    HealthScience,
    BasicScience,
    AgricScience,
    Rhymes,
    CreativeArt,
    Phonics,
    CRK,
    PVC,
  } = req.body;

  try {
    const result = await Nursery1result.findById(id);

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    // Helper function to update subject scores
    const updateSubject = (subjectData, subjectName) => {
      if (subjectData) {
        result[subjectName] = subjectData.map((item) => ({
          test: item.test,
          exam: item.exam,
          totalScore: item.test + item.exam, // Automatically calculate totalScore
          grade: item.grade || "",
          remark: item.remark || "",
        }));
      }
    };

    // Update subjects
    updateSubject(English, "English");
    updateSubject(Mathematics, "Mathematics");
    updateSubject(SocialHabit, "SocialHabit");
    updateSubject(CRK, "CRK");
    updateSubject(AgricScience, "AgricScience");
    updateSubject(HealthScience, "HealthScience");
    updateSubject(BasicScience, "BasicScience");
    updateSubject(Phonics, "Phonics");
    updateSubject(Rhymes, "Rhymes");

    updateSubject(PVC, "PVC");
    updateSubject(CreativeArt, "CreativeArt");

    // Recalculate TotalScore (sum of totalScores for all subjects)
    let totalScore = 0;
    let subjectCount = 0;

    Object.keys(result.toObject()).forEach((key) => {
      if (Array.isArray(result[key])) {
        result[key].forEach((item) => {
          if (item.totalScore) {
            totalScore += item.totalScore;
            subjectCount++;
          }
        });
      }
    });

    result.TotalScore = totalScore;
    result.TotalAverage =
      subjectCount > 0 ? (totalScore / subjectCount).toFixed(2) : "0";

    await result.save();

    res.json({ message: "Result updated successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update result" });
  }
});
router.put("/updated/:id", async (req, res) => {
  const { id } = req.params;
  const {
    English,
    Mathematics,
    SocialHabit,
    HealthScience,
    BasicScience,
    AgricScience,
    Rhymes,
    CreativeArt,
    Phonics,
    year,
    term,
    classes,
    // class,
    Writing,
  } = req.body;
  const EnglishresultsWithTotal = English.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const MathsresultsWithTotal = Mathematics.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const SocialHabitresultsWithTotal = SocialHabit.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const HealthScienceresultsWithTotal = HealthScience.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const BasicScienceresultsWithTotal = BasicScience.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const AgricresultsWithTotal = AgricScience.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const RhymesresultsWithTotal = Rhymes.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const WritingresultsWithTotal = Writing.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const CreativeArtresultsWithTotal = CreativeArt.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const PhonicsresultsWithTotal = Phonics.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  try {
    const prenurseryresult = await Nursery1result.findById(id);

    if (!prenurseryresult) {
      return res.status(404).json({ message: "Result not found" });
    }

    // Update the user's current class
    prenurseryresult.English =
      EnglishresultsWithTotal || prenurseryresult.English;
    prenurseryresult.Mathematics =
      MathsresultsWithTotal || prenurseryresult.Mathematics;
    prenurseryresult.BasicScience =
      BasicScienceresultsWithTotal || prenurseryresult.BasicScience;
    prenurseryresult.SocialHabit =
      SocialHabitresultsWithTotal || prenurseryresult.SocialHabit;
    prenurseryresult.AgricScience =
      AgricresultsWithTotal || prenurseryresult.AgricScience;
    prenurseryresult.Writing =
      WritingresultsWithTotal || prenurseryresult.Writing;
    prenurseryresult.Rhymes = RhymesresultsWithTotal || prenurseryresult.Rhymes;
    prenurseryresult.Phonics =
      PhonicsresultsWithTotal || prenurseryresult.Phonics;
    prenurseryresult.CreativeArt =
      CreativeArtresultsWithTotal || prenurseryresult.CreativeArt;
    prenurseryresult.HealthScience =
      HealthScienceresultsWithTotal || prenurseryresult.HealthScience;
    prenurseryresult.classes = classes || prenurseryresult.classes;
    prenurseryresult.year = year || prenurseryresult.year;
    prenurseryresult.term = term || prenurseryresult.term;
    prenurseryresult.schoolRegNumber =
      req.body.schoolRegNumber || prenurseryresult.schoolRegNumber;
    prenurseryresult.TotalScore =
      req.body.TotalScore || prenurseryresult.TotalScore;
    prenurseryresult.TotalAverage =
      req.body.TotalAverage || prenurseryresult.TotalAverage;
    prenurseryresult.Position = req.body.Position || prenurseryresult.Position;
    prenurseryresult.numberInClass =
      req.body.numberInClass || prenurseryresult.numberInClass;
    prenurseryresult.Remark = req.body.Remark || prenurseryresult.Remark;
    prenurseryresult.HmRemark = req.body.HmRemark || prenurseryresult.HmRemark;
    prenurseryresult.TotalGrade =
      req.body.TotalGrade || prenurseryresult.TotalGrade;
    prenurseryresult.Signature =
      req.body.Signature || prenurseryresult.Signature;
    await prenurseryresult.save();

    res.json({ message: "Result Position updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update" });
  }
}); ///////
router.put("/deactivateResultEdit", async (req, res) => {
  try {
    const { classes, year, term } = req.body;

    // Update all records that match the criteria
    const result = await Nursery1result.updateMany(
      { classes, year, term },
      { $set: { deActivateResultEdith: true } }
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//////
router.get("/:year/:term/", async (req, res) => {
  try {
    const { year, term } = req.params;

    // Use the parameters to query the database
    const basic5result = await Nursery1result.findOne({
      year,

      term,
    }).populate("user", [
      "firstName",
      "lastName",
      "passportPhoto",
      "schoolRegNumber",
    ]);

    if (!basic5result) {
      return res.status(404).json({ message: "Result not found" });
    }

    // Return the result as JSON
    res.json(basic5result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/update/otherFields/:id", async (req, res) => {
  const { id } = req.params;

  const { year, term, classes } = req.body; // Assuming the request body contains the Biology data as an array of test and exam objects

  // const modifyClass = class.replace(/\s+/g, "-");
  // Calculate the total score for each entry in the Biology array

  try {
    const prenurseryresult = await Nursery1result.findById(id);

    if (!prenurseryresult) {
      return res.status(404).json({ message: "Result not found" });
    }

    // Update the user's current class

    prenurseryresult.classes = classes || prenurseryresult.classes;
    prenurseryresult.year = year || prenurseryresult.year;
    prenurseryresult.term = term || prenurseryresult.term;
    prenurseryresult.schoolRegNumber =
      req.body.schoolRegNumber || prenurseryresult.schoolRegNumber;

    prenurseryresult.numberInClass =
      req.body.numberInClass || prenurseryresult.numberInClass;
    prenurseryresult.Remark = req.body.Remark || prenurseryresult.Remark;
    prenurseryresult.HmRemark = req.body.HmRemark || prenurseryresult.HmRemark;

    await prenurseryresult.save();

    res.json({ message: "Result updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update" });
  }
});
module.exports = router;
