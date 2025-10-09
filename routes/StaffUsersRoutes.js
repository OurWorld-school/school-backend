const router = require("express").Router();
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

const { default: generateToken } = require("../Utils/generateTokens");
const imagekit = require("../Utils/imagekit");
const StaffUsers = require("../models/StaffUsers");

// /registering a new staff

router.post("/registers/staff", async (req, res) => {
  const { firstName, lastName } = req.body;
  const schoolId = req.body.schoolName;
  try {
    const userExist = await StaffUsers.findOne({
      firstName,
      lastName,
      schoolName: schoolId,
    });
    if (userExist) {
      return res.status(409).json({ error: "User already exists." });
    }
    const result = await imagekit.upload({
      file: req.body.passportPhoto,
      fileName: `${req.body.firstName}-${req.body.lastName}.jpg`,
      // width:300,
      // crop:"scale"
    });
    const newUser = new StaffUsers({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userType: req.body.userType,
      schoolName: req.body.schoolName,
      currentClass: req.body.currentClass,
      roles: req.body.roles,

      phoneNumber: req.body.phoneNumber,
      passportPhoto: result.url,
      contactAdress: req.body.contactAdress,
      // password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();

    res.status(200).json({
      // token: generateToken(user._id),
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
      userType: user.userType,
      currentClass: user.currentClass,
      phoneNumber: user.phoneNumber,
      passportPhoto: user.passportPhoto,
      contactAdress: user.contactAdress,
      isAdmin: user.isAdmin,

      schoolName: user.schoolName,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/////login
router.post("/login", async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await StaffUsers.findOne({ phoneNumber });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.status(200).json({
      // token: generateToken(user._id),
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
      user: user.userType,
      phoneNumber: user.phoneNumber,
      passportPhoto: user.passportPhoto,
      contactAdress: user.contactAdress,
      isAdmin: user.isAdmin,

      currentClass: user.currentClass,
      schoolName: user.schoolName,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
//LOGIN
router.post("/logins", async (req, res) => {
  try {
    const user = await StaffUsers.findOne({
      phoneNumber: req.body.phoneNumber,
    });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json({
      // token: generateToken(user._id),
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
      user: user.userType,
      phoneNumber: user.phoneNumber,
      passportPhoto: user.passportPhoto,
      contactAdress: user.contactAdress,
      isAdmin: user.isAdmin,

      currentClass: user.currentClass,
      schoolName: user.schoolName,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

///////login
router.post("/student-login", async (req, res) => {
  try {
    const { schoolRegNumber, password } = req.body;
    const user = await StaffUsers.findOne({ schoolRegNumber });

    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).send("Invalid credentials");
    }

    // Set up a session or JWT token here if needed

    res.status(200).json({
      // token: generateToken(user._id),
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
      user: user.userType,
      phoneNumber: user.phoneNumber,
      passportPhoto: user.passportPhoto,
      contactAdress: user.contactAdress,
      isAdmin: user.isAdmin,

      currentClass: user.currentClass,
      schoolName: user.schoolName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
/////student login with regNumber and phonNumber
router.post("/student-logins", async (req, res) => {
  const { identifier, password } = req.body; // identifier can be schoolRegNumber or phoneNumber

  try {
    // Find user by schoolRegNumber or phoneNumber
    const user = await StaffUsers.findOne({
      $or: [{ schoolRegNumber: identifier }, { phoneNumber: identifier }],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).send("Invalid credentials");
    }

    // Generate JWT token
    // const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    // res.json({ token });
    res.status(200).json({
      // token: generateToken(user._id),
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
      user: user.userType,
      phoneNumber: user.phoneNumber,
      passportPhoto: user.passportPhoto,
      contactAdress: user.contactAdress,
      isAdmin: user.isAdmin,

      currentClass: user.currentClass,
      schoolName: user.schoolName,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
//Forgotten password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    // 1. Check if the user with the given email exists in the database
    const user = await StaffUsers.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    ////nodemailer
    const mailOptions = {
      from: "djnchrys@gmail.com",
      to: req.body.email,
      subject: "Registration Successful",
      html: `<p>Hello ${req.body.user.firstName},</p>
      <p>You are about to reset Your account password.</p><p>Click <a href="http://your-app-url/reset-password/${user.token}">here</a> to confirm your password reset.</p>`,
      //   text: "Congratulations, your registration was successful!",
    };
    // Generate a unique token and save it in the user document
    const token = generateToken();
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    // Send the password reset email
    const resetUrl = `http://your-app-url/reset-password/${token}`;
    sendPasswordResetEmail(email, resetUrl);

    res.json({ message: "Password reset instructions sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  try {
    // Find the user with the provided token
    const user = await StaffUsers.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Render the password reset form
    res.render("reset-password", { token });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Forgotten password
router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;
  try {
    // Find the user with the provided token
    const user = await StaffUsers.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    const mailOptions = {
      from: "djnchrys@gmail.com",
      to: req.body.email,
      subject: "Registration Successful",
      html: `<p>Hello ${req.body.user.firstName},</p>
  <p>Your password has been reset sucessfully. Thanks</p>`,
      //   text: "Congratulations, your registration was successful!",
    };
    // Update the user's password and clear the reset token fields
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
/// reset password
// Request a password reset token
router.post("/forgoten-password", async (req, res) => {
  const { schoolRegNumber } = req.body;

  try {
    const user = await StaffUsers.findOne({ schoolRegNumber });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a reset token and set its expiry
    const resetToken = Math.random().toString(36).substr(2, 10);
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour

    await user.save();

    // // Send the reset token to the user's email (you'll need to configure nodemailer)
    // const transporter = nodemailer.createTransport({
    //   // configure your mail transport
    // });

    // const mailOptions = {
    //   to: user.email,
    //   subject: 'Password Reset',
    //   text: `Your password reset token is: ${resetToken}`,
    // };

    // await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset token sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Reset password with a valid token

router.post("/reset-user-password", async (req, res) => {
  const { identifier, newPassword, schoolRegNumber, phoneNumber } = req.body;

  try {
    // Find the user by registration number or phoneNumber

    const user = await StaffUsers.findOne({
      $or: [{ schoolRegNumber: identifier }, { phoneNumber: identifier }],
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    await StaffUsers.updateOne(
      { schoolRegNumber },
      { phoneNumber },
      { password: hashedPassword }
    );
    // user.password = hashedPassword;
    // await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to reset password" });
  }
});

////////

router.get("/", async (req, res) => {
  try {
    const users = await StaffUsers.find({})
      .sort({ createdAt: -1 })
      .populate("currentClass", ["name"])
      .populate("schoolName");
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await StaffUsers.findById(req.params.id)
      .populate("currentClass", ["name"])
      .populate("schoolName");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await StaffUsers.findById(req.params.id);
    if (user) {
      await user.remove();
      res.status(200).json({ message: "This user has been deleted" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put("/update/:id", async (req, res) => {
  const { password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await StaffUsers.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.currentClass = req.body.currentClass || user.currentClass;

    user.roles = req.body.roles || user.roles;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    user.schoolRegNumber = req.body.schoolRegNumber || user.schoolRegNumber;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.contactAdress = req.body.contactAdress || user.contactAdress;
    user.password = hash;
    await user.save();
  } catch (err) {
    res.status(500).json({ err: "Failed to update" });
  }
});
router.put("/update-password/:userId", async (req, res) => {
  const { userId } = req.params;
  const { password } = req.body;

  try {
    const user = await StaffUsers.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Update the user's password
    user.password = hash;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.put("/currentclasses/:userId", async (req, res) => {
  const { userId } = req.params;
  const { currentClass } = req.body;

  try {
    const user = await StaffUsers.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's current class
    user.currentClass = currentClass || user.currentClass;
    await user.save();

    res.json({ message: "Student Class updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.put("/update/createpassword/:id", async (req, res) => {
  // const { image } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await StaffUsers.findById(req.params.id);

    user.password =
      (await bcrypt.hash(req.body.password, salt)) || user.password;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      password: updatedUser.password,
    });
  } catch (err) {
    res.status(500).json({ err: "Failed to update" });
  }
});
router.put("/update/isAdmin/:userId", async (req, res) => {
  const { userId } = req.params;
  const { isAdmin } = req.body;

  try {
    const user = await StaffUsers.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's current class
    user.isAdmin = isAdmin || user.isAdmin;
    await user.save();

    res.json({ message: "Admin updated successfully" });
  } catch (err) {
    res.status(500).json({ err: "Failed to update" });
  }
});
router.put("/update/isAdminser/:userId", async (req, res) => {
  const { userId } = req.params;
  const { isAdmin } = req.body;

  try {
    const user = await StaffUsers.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's current class
    user.isAdmin = isAdmin || user.isAdmin;
    await user.save();

    res.json({ message: "Admin updated successfully" });
  } catch (err) {
    res.status(500).json({ err: "Failed to update" });
  }
});
router.put("/update/changeUserRole/:userId", async (req, res) => {
  const { userId } = req.params;
  const { roles } = req.body;

  try {
    const user = await StaffUsers.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's current class
    user.roles = roles || user.roles;
    await user.save();

    res.json({ message: "Roles updated successfully" });
  } catch (err) {
    res.status(500).json({ err: "Failed to update" });
  }
});
router.put("/update/deactivateRole/:id", async (req, res) => {
  // const { image } = req.body;
  try {
    const user = await StaffUsers.findById(req.params.id);

    user.deactivateUserRole =
      req.body.deactivateUserRole || user.deactivateUserRole;

    const updatedUser = await user.save();
    // Delete the temporary file
    // fs.unlinkSync(image);
    res.status(200).json({
      _id: updatedUser._id,
      deactivateUserRole: updatedUser.deactivateUserRole,
    });
  } catch (err) {
    res.status(500).json({ err: "Failed to update" });
  }
});
router.put("/archiveStudent/:id", async (req, res) => {
  // const { image } = req.body;
  try {
    const user = await StaffUsers.findById(req.params.id);

    user.archiveStudent = req.body.archiveStudent || user.archiveStudent;

    const updatedUser = await user.save();
    // Delete the temporary file
    // fs.unlinkSync(image);
    res.status(200).json({
      _id: updatedUser._id,
      archiveStudent: updatedUser.archiveStudent,
    });
  } catch (err) {
    res.status(500).json({ err: "Failed to update" });
  }
});
module.exports = router;
