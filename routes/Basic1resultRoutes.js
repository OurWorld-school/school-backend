const Basic1result = require("../models/Basic1result");
const Nursery1result = require("../models/Nursery1result");
const Nursery2result = require("../models/Nursery2result");
const Nursery3result = require("../models/Nursery3result");
const User = require("../models/User");

const router = require("express").Router();
router.post("/", async (req, res) => {
  const {
    user,
    classes,
    year,
    term,
    schoolRegNumber,
    subjects, // array of { subject, test, exam, totalScore, grade, remark }
    TotalScore,
    TotalAverage,
    Position,
    numberInClass,
    TotalGrade,
    Remark,
    HmRemark,
    Signature,
  } = req.body;

  try {
    const existing = await Basic1result.findOne({
      user,
      year,
      term,
      classes,
    });

    if (existing) {
      return res.status(400).json({ message: "Result already exists for this user, class, term, and year." });
    }

    const newResult = new Basic1result({
      user,
      classes,
      year,
      term,
      schoolRegNumber,
      subjects,
      TotalScore,
      TotalAverage,
      Position,
      numberInClass,
      TotalGrade,
      Remark,
      HmRemark,
      Signature,
    });

    await newResult.save();

    await User.findByIdAndUpdate(user, {
      $push: { basic1result: newResult._id },
    });

    res.status(201).json(newResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save the result." });
  }
});
router.post("/post", async (req, res) => {
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
    Computer,
    NationalValues,
    PVC,
    year,
    user,
    term,
    classes,
    CreativeArt,
    Igbo,
    HandWriting,
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
  const NationalValuesresultsWithTotal = NationalValues.map((item) => ({
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
  const HistoryresultsWithTotal = History.map((item) => ({
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
  const PVCresultsWithTotal = PVC.map((item) => ({
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
  const HandWritingresultsWithTotal = HandWriting.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  // const grandTotal = English.totalScore + Mathematics.totalScore;

  try {
    const ResultAlreadyExits = await Basic1result.findOne({
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
    const newResult = new Basic1result({
      English: EnglishresultsWithTotal,
      Mathematics: MathsresultsWithTotal,
      BasicScience: BasicScienceresultsWithTotal,
      History: HistoryresultsWithTotal,
      CRK: CRKresultsWithTotal,
      HandWriting: HandWritingresultsWithTotal,
      VerbalReasoning: VerbalReasoningresultsWithTotal,
      NationalValues: NationalValuesresultsWithTotal,
      QuantitativeReasoning: QuantitativeReasoningsultsWithTotal,
      CreativeArt: CreativeArtresultsWithTotal,
      Phonics: PhonicsresultsWithTotal,
      Igbo: IgboresultsWithTotal,
      French: FrenchresultsWithTotal,
      Computer: ComputerresultsWithTotal,
      PVC: PVCresultsWithTotal,
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
      $push: { basic1result: newResult._id },
    });
    return res.status(201).json(newResult);
  } catch (error) {
    return res.status(500).json({ error: "Failed to save the result." });
  }
});
router.get("/", async (req, res) => {
  try {
    const basic1results = await Basic1result.find({})
      .sort({ createdAt: -1 })
      .populate("user", [
        "firstName",
        "lastName",
        "passportPhoto",
        "schoolRegNumber",
      ]);

    res.json(basic1results);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const basic1result = await Basic1result.findById(req.params.id).populate(
      "user",
      ["firstName", "lastName", "passportPhoto", "schoolRegNumber"]
    );
    res.status(200).json(basic1result);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/results/:user/:year/:term/", async (req, res) => {
  try {
    const { user, year, term } = req.params;

    // Use the parameters to query the database
    const basic1result = await Basic1result.findOne({
      user,
      year,

      term,
    }).populate("user", [
      "firstName",
      "lastName",
      "passportPhoto",
      "schoolRegNumber",
    ]);

    if (!basic1result) {
      return res.status(404).json({ message: "Result not found" });
    }

    // Return the result as JSON
    res.json(basic1result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/updateResultPosition/:id", async (req, res) => {
  const { id } = req.params;
  const { Position } = req.body;

  try {
    const prenurseryresult = await Basic1result.findById(id);

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
  const updateData = req.body;

  try {
    const existing = await Basic1result.findById(id);
    if (!existing) {
      return res.status(404).json({ message: "Result not found." });
    }

    // If 'subjects' is included, update and recalculate TotalScore and TotalAverage
    if (Array.isArray(updateData.subjects)) {
      let totalScore = 0;
      let subjectCount = 0;

      updateData.subjects.forEach((item) => {
        const score = Number(item.totalScore);
        if (!isNaN(score)) {
          totalScore += score;
          subjectCount++;
        }
      });

      updateData.TotalScore = totalScore;
      updateData.TotalAverage = subjectCount > 0 ? (totalScore / subjectCount).toFixed(2) : "0";
    }

    // Loop through each field in updateData and assign it to the existing doc
    Object.keys(updateData).forEach((key) => {
      existing[key] = updateData[key];
    });

    const updated = await existing.save();

    return res.status(200).json(updated);
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ error: "Failed to update the result." });
  }
});



router.put("/update/:id/old", async (req, res) => {
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
    CreativeArt,
    HandWriting,
    Igbo,
  } = req.body;

  try {
    const result = await Basic1result.findById(id);

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
    updateSubject(History, "History");
    updateSubject(CRK, "CRK");
    updateSubject(VerbalReasoning, "VerbalReasoning");
    updateSubject(QuantitativeReasoning, "QuantitativeReasoning");
    updateSubject(BasicScience, "BasicScience");
    updateSubject(Phonics, "Phonics");
    updateSubject(French, "French");
    updateSubject(Computer, "Computer");
    updateSubject(NationalValues, "NationalValues");
    updateSubject(PVC, "PVC");
    updateSubject(CreativeArt, "CreativeArt");
    updateSubject(HandWriting, "HandWriting");
    updateSubject(Igbo, "Igbo");

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
router.put("/updateds/:id", async (req, res) => {
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
    year,
    term,
    classes,
    CreativeArt,
    HandWriting,
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

  const NationalValuesresultsWithTotal = NationalValues.map((item) => ({
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
  // const WritingresultsWithTotal = Hand.map((item) => ({
  //   test: item.test,
  //   exam: item.exam,
  //   totalScore: item.totalScore,
  //   grade: item.grade,
  //   remark: item.remark,
  // }));
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
  const PVCresultsWithTotal = PVC.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const HistoryresultsWithTotal = History.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  const HandWritingresultsWithTotal = HandWriting.map((item) => ({
    test: item.test,
    exam: item.exam,
    totalScore: item.totalScore,
    grade: item.grade,
    remark: item.remark,
  }));
  try {
    const prenurseryresult = await Basic1result.findById(id);

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
    prenurseryresult.CreativeArt =
      CreativeArtresultsWithTotal || prenurseryresult.CreativeArt;
    prenurseryresult.Computer =
      ComputerresultsWithTotal || prenurseryresult.Computer;
    prenurseryresult.French = FrenchresultsWithTotal || prenurseryresult.French;
    prenurseryresult.Igbo = IgboresultsWithTotal || prenurseryresult.Igbo;
    prenurseryresult.NationalValues =
      NationalValuesresultsWithTotal || prenurseryresult.NationalValues;
    // prenurseryresult.Writing =
    //   WritingresultsWithTotal || prenurseryresult.Writing;
    prenurseryresult.HandWriting =
      HandWritingresultsWithTotal || prenurseryresult.HandWriting;
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
//////update other result fetures except subjects
router.put("/update/otherFields/:id", async (req, res) => {
  const { id } = req.params;

  const { year, term, classes } = req.body; // Assuming the request body contains the Biology data as an array of test and exam objects

  // const modifyClass = class.replace(/\s+/g, "-");
  // Calculate the total score for each entry in the Biology array

  try {
    const prenurseryresult = await Basic1result.findById(id);

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
////
router.put("/deactivateResultEdit", async (req, res) => {
  try {
    const { classes, year, term } = req.body;

    // Update all records that match the criteria
    const result = await Basic1result.updateMany(
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
    const basic5result = await Basic1result.findOne({
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
