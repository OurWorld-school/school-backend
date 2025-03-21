const Class = require("../models/Class");

const router = require("express").Router();

// /registerin

router.post("/", async (req, res) => {
  const { name } = req.body;

  const modifyName = name.replace(/\s+/g, "-");
  try {
    const existingClass = await Class.findOne({ name });

    if (existingClass) {
      return res
        .status(409)
        .json({ error: "Class already exists from this particular School." });
    }
    //create new user

    const newClass = new Class({
      name: modifyName,
    });

    const classes = await newClass.save();

    res.status(200).json({
      _id: classes._id,

      name: classes.name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const classes = await Class.find({}).sort({ createdAt: -1 });

    res.json(classes);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const classes = await Class.findById(req.params.id);

    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const classes = await Class.findByIdAndDelete(req.params.id);
    if (classes) {
      res.status(200).json({ message: "This Class has been deleted" });
    } else {
      res.status(404).json({ message: "Class not found" });
    }
  } catch (error) {
    res.status(500).json(error);
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
