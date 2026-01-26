const User = require("../models/Users");
const express = require("express");
const getuser = require("../Middleware/getuser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const key = process.env.secret_key;
const router = express.Router();
const { body, validationResult } = require("express-validator");
router.post(
  "/createuser",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Please Enter Your Valid Name"),
    body("username")
      .isLength({ min: 5 })
      .withMessage("Username Length should be At-Least of 4 characters"),
    body("email").isEmail().withMessage("Please Enter valid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password Length should of be 4 characters")
      .matches(/[A-Z]/)
      .withMessage(
        "Make Sure Your Password has At-Least 1 character in Upper-Case",
      )
      .matches(/[a-z]/)
      .withMessage(
        "Make Sure Your Password has At-Least 1 character in Lower-Case",
      ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { name, username, email, password } = req.body;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ Username: username });
      if (user) {
        return res
          .status(409)
          .json({
            success: false,
            message: "Username already exists Choose another Username",
          });
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
// Handling User Login
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
        return res
          .status(409)
          .json({
            success: false,
            message: "Please Enter Correct credentials ",
          });
      }
      const wait = await bcrypt.compare(password, user.Password);
      if (!wait) {
        return res
          .status(409)
          .json({
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
