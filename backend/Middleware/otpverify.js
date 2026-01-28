const User = require("../models/Users");
const bcrypt = require("bcrypt");
const OtpVerify = async (req, res, next) => {
  const Userotp = req.body.otp;
  const email = req.body.email;
  if (!Userotp || !email) {
    return res.status(400).json({ error: "OTP and email are required" });
  }
  try {
    const person = await User.findOne({ Recovery_Email: email });

    if (!person) {
      return res.status(400).json({ error: "Invalid email or OTP" });
    }

    if (!person.resetOTP) {
      return res
        .status(400)
        .json({ error: "No reset OTP found for this user" });
    }

    const isMatch = await bcrypt.compare(Userotp, person.resetOTP);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: "Invalid OTP" });
    }

    if (person.resetOTPExpire < Date.now()) {
      return res.status(400).json({ success: false, error: "OTP Expired" });
    }
    req.user = person;
    next();
  } catch (error) {
    console.error("OTP Verify Error:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
module.exports = OtpVerify;
