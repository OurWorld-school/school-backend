const ResultScratchCard = require("../models/ResultScratchCard");
const bcrypt = require("bcrypt");
const Scratchcard = require("../models/ScratchCrad");
const getRandom = require("../Utils/RandomNumbers");
const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const newCard = new Scratchcard({
      name: req.body.name,
      serialNumber: getRandom(11),
      pin: getRandom(10),
    });
    //save user and respond
    const card = await newCard.save();

    res.status(200).json({
      // token: generateToken(user._id),
      _id: card._id,
      name: card.name,
      serialNumber: card.serialNumber,
      pin: card.pin,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});
router.post("/scratchcard-login", async (req, res) => {
  const { serialNumber, pin } = req.body;
  try {
    const card = await Scratchcard.findOne({
      serialNumber,
      pin,
    });
    !card && res.status(404).json("card not found");
    card.usageCount++;
    if (card && card.usageCount >= 10) {
      return res
        .status(400)
        .json({ error: "This card has already been used 5 times." });
    }
    // const validPin = await compare(req.body.pin, card.pin);
    // !validPin && res.status(400).json("wrong password");

    res.status(200).json({
      // token: generateToken(user._id),
      _id: card._id,
      name: card.name,
      serialNumber: card.serialNumber,
      pin: card.pin,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const scratchcard = await Scratchcard.find({}).sort({ createdAt: -1 });
    res.json(scratchcard);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put("/usageCounts/:pin", async (req, res) => {
  // const pin = req.params.pin;
  try {
    const scratchcard = await Scratchcard.findOne({ pin: req.params.pin });
    if (!scratchcard) {
      return res.status(404).json({ error: "scratchcard not found" });
    }
    // Increment the download count
    scratchcard.usageCount++;
    //  mp3.downloadCount += 1;
    await scratchcard.save();

    // Return a response indicating success
    res.status(200).json({ message: "usageCount incremented successfully" });
  } catch (err) {
    res.status(500).json({ err: "Unable to update count" });
  }
});
module.exports = router;
