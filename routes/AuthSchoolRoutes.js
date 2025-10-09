const router = require("express").Router();
const nodemailer = require("nodemailer");

const imagekit = require("../Utils/imagekit");
const School = require("../models/School");
const getRandom = require("../Utils/RandomNumbers");

const { cloudinary_js_config } = require("../Utils/cloudinary");

// /registerin
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "djnchrys@gmail.com",
    pass: "brtsimracnxenwum",
  },
});
router.post("/", async (req, res) => {
  const { schoolRegCode, name } = req.body;
  const modifyName = name.replace(/\s+/g, "_");
  try {
    const schoolExist = await School.findOne({
      schoolRegCode,
    });
    if (schoolExist) {
      return res.status(409).json({ error: "School already exists." });
    }
    const logo = await imagekit.upload({
      file: req.body.schoolLogo,
      fileName: `${req.body.name}-${req.body.name}.jpg`,
      // width:300,
      // crop:"scale"
    });
    const uniqueNumber = getRandom(6);
    const newSchool = new School({
      name: modifyName,
      email: req.body.email,
      productMarketer: req.body.productMarketer,
      phoneNumber: req.body.phoneNumber,
      country: req.body.country,
      city: req.body.city,
      schoolType: req.body.schoolType,
      state: req.body.state,
      schoolRegCode: `ourworld${uniqueNumber}`,
      phoneNumber: req.body.phoneNumber,
      schoolLogo: logo.url,
      address: req.body.address,
      postalCode: req.body.postalCode,
    });
    //nodemailer
    const mailOptions = {
      from: "djnchrys@gmail.com",
      to: req.body.email,
      subject: "Your School Registration is Successful",
      html: `<p>Hello ${req.body.name},</p>
      <p>Thank you for registering with myeduresult.com
       Your account has successfully been created.</p><p>Kindly call +2348136757488 incase if you have any suggestion or Observation Thanks.
       Myeduresult is a school management system which helps schools to upload their terminal result and also for students to check their terminal result. </p><p>Click <a href="https://myeduresult.com/">here</a> to visit the site</p>`,
    };
    //save user and respond
    const school = await newSchool.save();
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    // await ProductMarketer.findByIdAndUpdate(productMarketer, {
    //   $push: { schoolName: newSchool.name },
    // });
    res.status(200).json({
      // token: generateToken(user._id),
      _id: school._id,
      name: school.name,
      email: school.email,
      schoolRegCode: school.schoolRegCode,
      postalCode: school.postalCode,
      schoolType: school.schoolType,
      city: school.city,
      phoneNumber: school.phoneNumber,
      schoolLogo: school.schoolLogo,
      address: school.address,
      state: school.state,
      country: school.country,
      productMarketer: school.productMarketer,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/schoolLogin", async (req, res) => {
  const { schoolRegCode, email } = req.body;

  // Simple validation
  if (!email || !schoolRegCode) {
    return res.status(400).json({ error: "Please enter all fields" });
  }

  try {
    // Check for user
    const school = await School.findOne({ email });
    if (!school)
      return res.status(400).json({ error: "School does not exist" });

    // Validate regCode
    if (school.schoolRegCode !== schoolRegCode) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Sign token

    res.status(200).json({
      _id: school._id,
      name: school.name,
      email: school.email,
      schoolRegCode: school.schoolRegCode,
      postalCode: school.postalCode,
      schoolType: school.schoolType,
      city: school.city,
      phoneNumber: school.phoneNumber,
      schoolLogo: school.schoolLogo,
      address: school.address,
      state: school.state,
      country: school.country,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
// School LOGIN
router.post("/schoolLogins", async (req, res) => {
  const { schoolRegCode, email } = req.body;
  try {
    const school = await School.findOne({
      schoolRegCode,
      email,
    });
    !school && res.status(404).json("School not found");

    res.status(200).json({
      // token: generateToken(user._id),
      _id: school._id,
      name: school.name,
      email: school.email,
      schoolRegCode: school.schoolRegCode,
      postalCode: school.postalCode,
      schoolType: school.schoolType,
      city: school.city,
      phoneNumber: school.phoneNumber,
      schoolLogo: school.schoolLogo,
      address: school.address,
      state: school.state,
      country: school.country,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//////// payment section
router.put("/payment/:id", async (req, res) => {
  const { id } = req.params;
  const { paymentAmount, paymentDate, expiryDate } = req.body;

  try {
    const payment = await School.findById(id);
    if (!payment) {
      return res.status(404).send({ message: "School not found" });
    }
    const paymentDate = new Date();
    const expiryDate = new Date(
      paymentDate.getFullYear() + 1,
      paymentDate.getMonth(),
      paymentDate.getDate()
    ); // m is 1 year

    (payment.paymentAmount = paymentAmount || payment.paymentAmount),
      (payment.paymentDate = paymentDate || payment.paymentDate),
      (payment.expiryDate = expiryDate || payment.expiryDate);

    await payment.save();
    res.status(201).json({
      // token: generateToken(user._id),
      _id: payment._id,
      name: payment.name,
      paymentAmount: payment.paymentAmount,
      paymentDate: payment.paymentDate,
      expiryDate: payment.expiryDate,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Route for validating payment
router.get("/payment/:id/validate", async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await School.findById(id);
    if (!payment) {
      return res.status(404).send({ message: "School not found" });
    }

    const currentDate = new Date();
    if (
      currentDate >= payment.paymentDate &&
      currentDate <= payment.expiryDate
    ) {
      res.send({ valid: true });
    } else {
      res.send({ valid: false });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
router.put("/isPaid/:id", async (req, res) => {
  // const { image } = req.body;
  try {
    const school = await School.findById(req.params.id);

    school.isPaid = req.body.isPaid || school.isPaid;

    const updatedSchool = await school.save();
    // Delete the temporary file
    // fs.unlinkSync(image);
    res.status(200).json({
      _id: updatedSchool._id,
      isPaid: updatedSchool.isPaid,
    });
  } catch (err) {
    res.status(500).json({ err: "Failed to update" });
  }
});
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    schoolStamp,
    phoneNumber,
    schoolType,
    address,
    postalCode,
    city,
    schoolLogo,
    country,
    state,
  } = req.body;
  const modifyName = name.replace(/\s+/g, "_");
  try {
    const subjects = await School.findById(id);

    if (!subjects) {
      return res.status(404).json({ message: "School not found" });
    }
    // const stamp = await cloudinary_js_config.upload({
    //   file: req.body.schoolStamp,
    // });
    // const logo = await imagekit.upload({
    //   file: req.body.schoolLogo,
    //   fileName: `${req.body.name}-${req.body.name}.jpg`,
    //   // width:300,
    //   // crop:"scale"
    // });
    const stamp = await imagekit.upload({
      file: req.body.schoolStamp,
      fileName: `${req.body.name}-${req.body.name}.jpg`,
      // width:300,
      // crop:"scale"
    });
    // Update the user's current class
    subjects.name = modifyName || subjects.name;
    subjects.email = email || subjects.email;
    subjects.phoneNumber = phoneNumber || subjects.phoneNumber;
    subjects.schoolType = schoolType || subjects.schoolType;
    subjects.address = address || subjects.address;
    subjects.postalCode = postalCode || subjects.postalCode;
    subjects.city = city || subjects.city;
    subjects.country = country || subjects.country;
    subjects.state = state || subjects.state;
    // subjects.schoolLogo = logo.url || subjects.schoolLogo;

    subjects.schoolStamp = stamp.url || subjects.schoolStamp;
    await subjects.save();

    res.json({ message: "School Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
