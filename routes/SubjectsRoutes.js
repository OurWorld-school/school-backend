
const Subjects = require("../models/Subjects");
const router = require("express").Router();

// /registerin

router.post("/", async (req, res) => {
  const { name, classes } = req.body;

//   const modifyName = name.replace(/\s+/g, "-");
  try {
    const existingSubject = await Subjects.findOne({ name, classes });

    if (existingSubject) {
      return res
        .status(409)
        .json({ error: "Subject already exists from this particular Class." });
    }
    //create new user

    const newSubject = new Class({
      name: name,
      classes,
    });

    const data = await newSubject.save();

    res.status(200).json({
      _id: data._id,

      name: data.name,
      classes: data.classes
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const classes = await Subjects.find({}).sort({ createdAt: -1 });

    res.json(classes);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const classes = await Subjects.findById(req.params.id);

    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const classes = await Subjects.findByIdAndDelete(req.params.id);
    if (classes) {
      res.status(200).json({ message: "This Subject has been deleted" });
    } else {
      res.status(404).json({ message: "Subject not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name,classes } = req.body;
  try {
    const data = await Subjects.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Subjects not found" });
    }

    // Update the user's current class
    data.name = name || data.name;
    data.classes = classes || data.classes;
    await data.save();

    res.json({ message: "Subjects updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
