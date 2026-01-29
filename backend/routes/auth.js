const User = require("../models/Users");
const express = require("express");
const getuser = require("../Middleware/getuser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const key = process.env.SECRET_KEY;
const nodemailer = require("nodemailer");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const OtpVerify = require("../Middleware/otpverify");
router.post(
  "/createuser",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Please Enter Your Valid Name"),
    body("username")
      .isLength({ min: 5 })
      .withMessage("Username Length should be At-Least  5 characters"),
    body("email").isEmail().withMessage("Please Enter valid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password Length should At least 6 characters"),

    body("recovery_email")
      .optional()
      .isEmail()
      .withMessage("please Enter valid Email"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let { name, username, email, password, Recoveryemail } = req.body;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ Username: username });
      if (user) {
        return res.status(409).json({
          success: false,
          message: "Username already exists Choose another Username",
        });
      }
      user = await User.findOne({Recovery_Email: Recoveryemail})
      if(user){
         return res
          .status(409)
          .json({ success: false, message: "Please choose different recoveryEmail " });
      }
      }
      user = await User.findOne({ Email: email });
      if (user) {
        return res
          .status(409)
          .json({ success: false, message: "Email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const securepassword = await bcrypt.hash(password, salt);
      user = await User.create({
        Name: name,
        Username: username,
        Email: email,
        Password: securepassword,
        Recovery_Email: Recoveryemail,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, key);
      return res.json({
        success: true,
        message: "Sign Successful",
        authtoken: authtoken,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

router.post(
  "/forgotpassword",
  [body("email").isEmail().withMessage("Please Enter valid Email")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      let { email } = req.body;
      let user = null;
      if (email) {
        user = await User.findOne({ Recovery_Email: email.toLowerCase() });
      }
      if (!user) {
        return res.status(200).json({
          success: true,
          message: "If the account exists, an OTP has been sent",
        });
      }
      const backotp = Math.floor(100000 + Math.random() * 900000).toString();
      const newotp = await bcrypt.hash(backotp, 10);

      user.resetOTP = newotp;
      user.resetOTPExpire = Date.now() + 10 * 60 * 1000;
      user.resetOTPAttempts = 0;
      await user.save();

      // Send OTP
      if (user.Recovery_Email) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
        await transporter.sendMail({
          from: `"Your App" <${process.env.EMAIL_USER}>`,
          to: user.Recovery_Email,
          subject: "Your OTP for password reset",
          text: `Your OTP is ${backotp}. It will expire in 10 minutes.`,
        });
      }
      return res.status(200).json({
        success: true,
        message: "If the account exists, an OTP has been sent",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
);
router.post("/createpassword", OtpVerify, async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ error: "New password is required" });
    }
    const user = req.user;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetOTP = undefined;
    user.resetOTPExpire = undefined;
    user.resetOTPAttempts = 0;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please Enter valid Email"),
    body("password").exists().withMessage("please enter the password first "),
  ],
  async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      const user = await User.findOne({ Email: email });
      if (!user) {
        return res.status(409).json({
          success: false,
          message: "Please Enter Correct credentials ",
        });
      }
      const wait = await bcrypt.compare(password, user.Password);
      if (!wait) {
        return res.status(409).json({
          success: false,
          message: "Please Enter Correct credentials ",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, key);
      return res.json({
        success: true,
        message: "Login successful",
        authtoken: authtoken,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server Error" });
    }
  },
);
router.post("/getuser", getuser, async (req, res) => {
  try {
    const userId = req.info.id;
    const data = await User.findById(userId).select("-Password");
    return res.json({ data: data });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
});
module.exports = router;
