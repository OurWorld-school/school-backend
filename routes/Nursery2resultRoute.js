const Nursery1result = require("../models/Nursery1result");
const Nursery2result = require("../models/Nursery2result");
const User = require("../models/User");

const router = require("express").Router();
router.post("/", async (req, res) => {
  const userId = req.body.user;
  const {
    English,
    Mathematics,
    SocialStudies,
    CRK,
    VerbalReasoning,
    QuantitativeReasoning,
    BasicScience,
    Phonics,
    French,
    Writing,

    Computer,
    year,
    term,
    classes,
    CreativeArt,
    Igbo,
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
  const SocialStudiesresultsWithTotal = SocialStudies.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const CRKresultsWithTotal = CRK.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const VerbalReasoningresultsWithTotal = VerbalReasoning.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const QuantitativeReasoningsultsWithTotal = QuantitativeReasoning.map(
    (item) => ({
      test: item.test,
      exam: item.exam,
      totalScore: item.totalScore,
      grade: item.grade,
      remark: item.remark,
    })
  );
  const BasicScienceresultsWithTotal = BasicScience.map((item) => ({
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
  const FrenchresultsWithTotal = French.map((item) => ({
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
  const IgboresultsWithTotal = Igbo.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const ComputerresultsWithTotal = Computer.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  // const grandTotal = English.totalScore + Mathematics.totalScore;

  try {
    const ResultAlreadyExits =
      (await Nursery2result.findOne({
        year,
        term,
        classes,
      })) && (await User.findById(req.params.userId));

    if (ResultAlreadyExits) {
      return res.status(404).json({ message: "User Result already Exits" });
    }

    // Create a new result document in the database with the Biology array containing total scores
    const newResult = new Nursery2result({
      English: EnglishresultsWithTotal,
      Mathematics: MathsresultsWithTotal,
      BasicScience: BasicScienceresultsWithTotal,
      SocialStudies: SocialStudiesresultsWithTotal,
      CRK: CRKresultsWithTotal,
      VerbalReasoning: VerbalReasoningresultsWithTotal,
      Writing: WritingresultsWithTotal,
      QuantitativeReasoning: QuantitativeReasoningsultsWithTotal,
      CreativeArt: CreativeArtresultsWithTotal,
      Phonics: PhonicsresultsWithTotal,
      Igbo: IgboresultsWithTotal,
      French: FrenchresultsWithTotal,
      Computer: ComputerresultsWithTotal,

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
      $push: { nursery2result: newResult._id },
    });
    return res.status(201).json(newResult);
  } catch (error) {
    return res.status(500).json({ error: "Failed to save the result." });
  }
});
router.get("/", async (req, res) => {
  try {
    const nursery2results = await Nursery2result.find({})
      .sort({ createdAt: -1 })
      .populate("user", [
        "firstName",
        "lastName",
        "passportPhoto",
        "schoolRegNumber",
      ]);

    res.json(nursery2results);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const nursery2result = await Nursery2result.findById(
      req.params.id
    ).populate("user", [
      "firstName",
      "lastName",
      "passportPhoto",
      "schoolRegNumber",
    ]);
    res.status(200).json(nursery2result);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/results/:user/:year/:term/", async (req, res) => {
  try {
    const { user, year, term } = req.params;

    // Use the parameters to query the database
    const nursery2result = await Nursery2result.findOne({
      user,
      year,

      term,
    }).populate("user", [
      "firstName",
      "lastName",
      "passportPhoto",
      "schoolRegNumber",
    ]);

    if (!nursery2result) {
      return res.status(404).json({ message: "Result not found" });
    }

    // Return the result as JSON
    res.json(nursery2result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;

  const {
    English,
    Mathematics,
    SocialStudies,
    CRK,
    VerbalReasoning,
    QuantitativeReasoning,
    BasicScience,
    Phonics,
    French,
    Writing,
    Computer,
    year,
    term,
    classes,
    CreativeArt,
    Igbo,
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
  const SocialStudiesresultsWithTotal = SocialStudies.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const CRKresultsWithTotal = CRK.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const VerbalReasoningresultsWithTotal = VerbalReasoning.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const QuantitativeReasoningsultsWithTotal = QuantitativeReasoning.map(
    (item) => ({
      test: item.test,
      exam: item.exam,
      totalScore: item.totalScore,
      grade: item.grade,
      remark: item.remark,
    })
  );
  const BasicScienceresultsWithTotal = BasicScience.map((item) => ({
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
  const FrenchresultsWithTotal = French.map((item) => ({
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
  const IgboresultsWithTotal = Igbo.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const ComputerresultsWithTotal = Computer.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  try {
    const prenurseryresult = await Nursery2result.findById(id);

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
    prenurseryresult.SocialStudies =
      SocialStudiesresultsWithTotal || prenurseryresult.SocialStudies;
    prenurseryresult.CRK = CRKresultsWithTotal || prenurseryresult.CRK;
    prenurseryresult.VerbalReasoning =
      VerbalReasoningresultsWithTotal || prenurseryresult.VerbalReasoning;
    prenurseryresult.QuantitativeReasoning =
      QuantitativeReasoningsultsWithTotal ||
      prenurseryresult.QuantitativeReasoning;
    prenurseryresult.Phonics =
      PhonicsresultsWithTotal || prenurseryresult.Phonics;
    prenurseryresult.CreativeArt =
      CreativeArtresultsWithTotal || prenurseryresult.CreativeArt;
    prenurseryresult.Computer =
      ComputerresultsWithTotal || prenurseryresult.Computer;
    prenurseryresult.French = FrenchresultsWithTotal || prenurseryresult.French;
    prenurseryresult.Igbo = IgboresultsWithTotal || prenurseryresult.Igbo;
    prenurseryresult.Writing =
      WritingresultsWithTotal || prenurseryresult.Writing;
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

    res.json({ message: "Result updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update" });
  }
});
router.put("/updateResultPosition/:id", async (req, res) => {
  const { id } = req.params;
  const { Position } = req.body;

  try {
    const prenurseryresult = await Nursery2result.findById(id);

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
/////
router.put("/deactivateResultEdit", async (req, res) => {
  try {
    const { classes, year, term } = req.body;

    // Update all records that match the criteria
    const result = await Nursery2result.updateMany(
      { classes, year, term },
      { $set: { deActivateResultEdith: true } }
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
/////

module.exports = router;
