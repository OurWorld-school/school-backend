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

module.exports = router;
