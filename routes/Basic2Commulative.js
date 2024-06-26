const User = require("../models/User");
const Basic2Commulative = require("../models/Basic2Comulative");
const router = require("express").Router();
router.post("/", async (req, res) => {
  const userId = req.body.user;
  const {
    English,
    Mathematics,
    History,
    CRK,
    VerbalReasoning,
    QuantitativeReasoning,
    BasicScience,
    Phonics,
    French,
    // Computer,
    NationalValues,
    PVC,
    HandWriting,
    year,
    user,
    term,
    classes,
    CreativeArt,
    Igbo,
  } = req.body; // Assuming the request body contains the Biology data as an array of test and exam objects

  // const modifyClass = class.replace(/\s+/g, "-");
  // Calculate the total score for each entry in the Biology array
  const EnglishresultsWithTotal = English.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const MathsresultsWithTotal = Mathematics.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const NationalValuesresultsWithTotal = NationalValues.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const CRKresultsWithTotal = CRK.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const VerbalReasoningresultsWithTotal = VerbalReasoning.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const QuantitativeReasoningsultsWithTotal = QuantitativeReasoning.map(
    (item) => ({
      total1stTermScore: item.total1stTermScore,
      total2ndTermScore: item.total2ndTermScore,
      total3rdTermScore: item.total3rdTermScore,
      totalScore: item.totalScore,
      totalAverage: item.totalAverage,
      grade: item.grade,
      remark: item.remark,
    })
  );
  const BasicScienceresultsWithTotal = BasicScience.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const HistoryresultsWithTotal = History.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const PhonicsresultsWithTotal = Phonics.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const FrenchresultsWithTotal = French.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const PVCresultsWithTotal = PVC.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const CreativeArtresultsWithTotal = CreativeArt.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const IgboresultsWithTotal = Igbo.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  // const ComputerresultsWithTotal = Computer.map((item) => ({
  //   total1stTermScore: item.total1stTermScore,
  //   total2ndTermScore: item.total2ndTermScore,
  //   total3rdTermScore: item.total3rdTermScore,
  //   totalScore: item.totalScore,
  //   totalAverage: item.totalAverage,
  //   grade: item.grade,
  //   remark: item.remark,
  // }));
  const HandWritingresultsWithTotal = HandWriting.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  // const grandTotal = English.totalScore + Mathematics.totalScore;

  try {
    const ResultAlreadyExits = await Basic2Commulative.findOne({
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
    const newResult = new Basic2Commulative({
      English: EnglishresultsWithTotal,
      Mathematics: MathsresultsWithTotal,
      BasicScience: BasicScienceresultsWithTotal,
      History: HistoryresultsWithTotal,
      CRK: CRKresultsWithTotal,
      VerbalReasoning: VerbalReasoningresultsWithTotal,
      NationalValues: NationalValuesresultsWithTotal,
      QuantitativeReasoning: QuantitativeReasoningsultsWithTotal,
      CreativeArt: CreativeArtresultsWithTotal,
      Phonics: PhonicsresultsWithTotal,
      Igbo: IgboresultsWithTotal,
      French: FrenchresultsWithTotal,
      // Computer: ComputerresultsWithTotal,
      PVC: PVCresultsWithTotal,
      HandWriting: HandWritingresultsWithTotal,
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
      $push: { basic2commulative: newResult._id },
    });
    return res.status(201).json(newResult);
  } catch (error) {
    return res.status(500).json({ error: "Failed to save the result." });
  }
});
router.get("/", async (req, res) => {
  try {
    const basic2results = await Basic2Commulative.find({})
      .sort({ createdAt: -1 })
      .populate("user", [
        "firstName",
        "lastName",
        "passportPhoto",
        "schoolRegNumber",
      ]);

    res.json(basic2results);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const basic2result = await Basic2Commulative.findById(
      req.params.id
    ).populate("user", [
      "firstName",
      "lastName",
      "passportPhoto",
      "schoolRegNumber",
    ]);
    res.status(200).json(basic2result);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/results/:user/:year/:term/", async (req, res) => {
  try {
    const { user, year, term } = req.params;

    // Use the parameters to query the database
    const basic2result = await Basic2Commulative.findOne({
      user,
      year,

      term,
    }).populate("user", [
      "firstName",
      "lastName",
      "passportPhoto",
      "schoolRegNumber",
    ]);

    if (!basic2result) {
      return res.status(404).json({ message: "Result not found" });
    }

    // Return the result as JSON
    res.json(basic2result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/updateResultPosition/:id", async (req, res) => {
  const { id } = req.params;
  const { Position } = req.body;

  try {
    const prenurseryresult = await Basic2Commulative.findById(id);

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
    History,
    CRK,
    VerbalReasoning,
    QuantitativeReasoning,
    BasicScience,
    Phonics,
    French,
    Computer,
    NationalValues,
    PVC,
    HandWriting,
    year,
    term,
    classes,
    CreativeArt,
    Igbo,
  } = req.body; // Assuming the request body contains the Biology data as an array of test and exam objects

  // const modifyClass = class.replace(/\s+/g, "-");
  // Calculate the total score for each entry in the Biology array
  const EnglishresultsWithTotal = English.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const MathsresultsWithTotal = Mathematics.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));

  const NationalValuesresultsWithTotal = NationalValues.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const CRKresultsWithTotal = CRK.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const VerbalReasoningresultsWithTotal = VerbalReasoning.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const QuantitativeReasoningsultsWithTotal = QuantitativeReasoning.map(
    (item) => ({
      total1stTermScore: item.total1stTermScore,
      total2ndTermScore: item.total2ndTermScore,
      total3rdTermScore: item.total3rdTermScore,
      totalScore: item.totalScore,
      totalAverage: item.totalAverage,
      grade: item.grade,
      remark: item.remark,
    })
  );
  const BasicScienceresultsWithTotal = BasicScience.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const WritingresultsWithTotal = Writing.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const PhonicsresultsWithTotal = Phonics.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const FrenchresultsWithTotal = French.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));

  const CreativeArtresultsWithTotal = CreativeArt.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const IgboresultsWithTotal = Igbo.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const ComputerresultsWithTotal = Computer.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const PVCresultsWithTotal = PVC.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const HistoryresultsWithTotal = History.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  const HandWritingresultsWithTotal = HandWriting.map((item) => ({
    total1stTermScore: item.total1stTermScore,
    total2ndTermScore: item.total2ndTermScore,
    total3rdTermScore: item.total3rdTermScore,
    totalScore: item.totalScore,
    totalAverage: item.totalAverage,
    grade: item.grade,
    remark: item.remark,
  }));
  try {
    const prenurseryresult = await Basic2Commulative.findById(id);

    if (!prenurseryresult) {
      return res.status(404).json({ message: "Result not found" });
    }

    // Update the user's current class
    prenurseryresult.English =
      EnglishresultsWithTotal || prenurseryresult.English;
    prenurseryresult.Mathematics =
      MathsresultsWithTotal || prenurseryresult.Mathematics;
    prenurseryresult.PVC = PVCresultsWithTotal || prenurseryresult.PVC;
    prenurseryresult.BasicScience =
      BasicScienceresultsWithTotal || prenurseryresult.BasicScience;
    prenurseryresult.History =
      HistoryresultsWithTotal || prenurseryresult.History;
    prenurseryresult.CRK = CRKresultsWithTotal || prenurseryresult.CRK;
    prenurseryresult.VerbalReasoning =
      VerbalReasoningresultsWithTotal || prenurseryresult.VerbalReasoning;
    prenurseryresult.QuantitativeReasoning =
      QuantitativeReasoningsultsWithTotal ||
      prenurseryresult.QuantitativeReasoning;
    prenurseryresult.Phonics =
      PhonicsresultsWithTotal || prenurseryresult.Phonics;
    prenurseryresult.HandWriting =
      HandWritingresultsWithTotal || prenurseryresult.HandWriting;
    prenurseryresult.CreativeArt =
      CreativeArtresultsWithTotal || prenurseryresult.CreativeArt;
    prenurseryresult.Computer =
      ComputerresultsWithTotal || prenurseryresult.Computer;
    prenurseryresult.French = FrenchresultsWithTotal || prenurseryresult.French;
    prenurseryresult.Igbo = IgboresultsWithTotal || prenurseryresult.Igbo;
    prenurseryresult.NationalValues =
      NationalValuesresultsWithTotal || prenurseryresult.NationalValues;
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
/////
router.put("/deactivateResultEdit", async (req, res) => {
  try {
    const { classes, year, term } = req.body;

    // Update all records that match the criteria
    const result = await Basic2Commulative.updateMany(
      { classes, year, term },
      { $set: { deActivateResultEdith: true } }
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
/////
router.get("/:year/:term/", async (req, res) => {
  try {
    const { year, term } = req.params;

    // Use the parameters to query the database
    const basic5result = await Basic2Commulative.findOne({
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
module.exports = router;
