const Class = require("../models/Class");
const School = require("../models/School");

const router = require("express").Router();

// /registerin

router.post("/", async (req, res) => {
  const { name } = req.body;
  const schoolId = req.body.schoolName;
  const modifyName = name.replace(/\s+/g, "_");
  try {
    const existingClass = await Class.findOne({
      modifyName,
      schoolName: schoolId,
    });

    if (existingClass) {
      return res
        .status(409)
        .json({ error: "Class already exists from this particular School." });
    }
    //create new user

    const newClass = new Class({
      name: modifyName,
      schoolName: req.body.schoolName,
    });

    const classes = await newClass.save();

    res.status(200).json({
      _id: classes._id,
      schoolName: classes.schoolName,
      name: classes.name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const classes = await Class.find({})
      .sort({ createdAt: -1 })
      .populate("schoolName", ["name"]);
    res.json(classes);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const classes = await Class.findById(req.params.id).populate("schoolName", [
      "name",
    ]);

    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:classId/:schoolId", async (req, res) => {
  try {
    const { schoolId, classId } = req.params;

    // Find and delete the class that matches both schoolId and classId
    const deletedClass = await Class.findOneAndDelete({
      _id: classId,
      schoolName: schoolId,
    });

    if (!deletedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found or does not belong to this school",
      });
    }

    res.status(200).json({
      success: true,
      message: "Class deleted successfully",
      data: deletedClass,
    });
  } catch (error) {
    console.error("Error deleting class:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const classes = await Class.findById(id);

    if (!classes) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Update the user's current class
    classes.name = name || classes.name;
    await classes.save();

    res.json({ message: "Class updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
